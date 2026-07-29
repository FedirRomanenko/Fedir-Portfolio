const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

let w = 0;
let h = 0;
let pixelRatio = 1;

const mouse = { x: -1000, y: -1000 };
const dots = [];
const atoms = [];
const bonds = [];
const waves = [];
const activeContacts = new Set();
const pendingExplosions = new Set();
const explosions = [];
let contentObstacles = [];
let nextAtomId = 1;

const DOTS_PER_VIEWPORT = 150;
const ATOMS_PER_VIEWPORT = window.innerWidth < 700 ? 10 : 20;
const MAX_BONDS_PER_ATOM = 3;
const REACTION_HINT_DISTANCE = 115;
const CONTENT_SELECTOR = [
    ".header", ".hero-content", ".section-title", ".about-card", ".stat-card",
    ".project-card", ".contact-card", ".project-preview", ".info-card", ".spec-card",
    ".feature-card", ".gallery-grid", ".lesson-card", ".lab-table", ".ideas-board", "footer"
].join(",");
const PERIODIC_SYMBOLS = `
H He Li Be B C N O F Ne Na Mg Al Si P S Cl Ar K Ca Sc Ti V Cr Mn Fe Co Ni Cu Zn
Ga Ge As Se Br Kr Rb Sr Y Zr Nb Mo Tc Ru Rh Pd Ag Cd In Sn Sb Te I Xe Cs Ba
La Ce Pr Nd Pm Sm Eu Gd Tb Dy Ho Er Tm Yb Lu Hf Ta W Re Os Ir Pt Au Hg Tl Pb
Bi Po At Rn Fr Ra Ac Th Pa U Np Pu Am Cm Bk Cf Es Fm Md No Lr Rf Db Sg Bh Hs
Mt Ds Rg Cn Nh Fl Mc Lv Ts Og
`.trim().split(/\s+/);

const ELEMENT_COLORS = [
    "#7dd3fc", "#fb7185", "#cbd5e1", "#a78bfa", "#fbbf24", "#f472b6",
    "#f97316", "#34d399", "#60a5fa", "#e879f9", "#94a3b8", "#a3e635"
];

const ATOM_TYPES = PERIODIC_SYMBOLS.map((symbol, index) => ({
    symbol,
    mass: index + 1,
    color: ELEMENT_COLORS[index % ELEMENT_COLORS.length]
}));

const REACTIVE_PAIRS = new Set([
    "H:O", "F:Li", "Cl:Na", "Mg:O", "Br:K", "Ca:F", "Al:O", "Cs:F"
]);

function resize() {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = Math.max(window.innerHeight, document.documentElement.scrollHeight);
    canvas.width = Math.floor(w * pixelRatio);
    canvas.height = Math.floor(h * pixelRatio);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    populateScene();
    refreshContentObstacles();
}

function targetCount(base, maximum) {
    const pageLength = Math.max(1, h / window.innerHeight);
    return Math.min(maximum, Math.ceil(base * pageLength));
}

function populateScene() {
    const dotTarget = targetCount(DOTS_PER_VIEWPORT, 380);
    const atomTarget = targetCount(ATOMS_PER_VIEWPORT, 100);

    while (dots.length < dotTarget) dots.push(new Dot());
    while (atoms.length < atomTarget) atoms.push(new Atom());
}

function refreshContentObstacles() {
    contentObstacles = Array.from(document.querySelectorAll(CONTENT_SELECTOR)).map(element => {
        const rect = element.getBoundingClientRect();
        return {
            left: rect.left,
            right: rect.right,
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY
        };
    });
}

class Dot {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        // A little faster than before, while still keeping the background calm.
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.8 + 1;
        this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;

        this.x = Math.max(0, Math.min(w, this.x));
        this.y = Math.max(0, Math.min(h, this.y));
        this.pulse += 0.03;
    }

    radius() {
        const distance = Math.hypot(this.x - mouse.x, this.y - mouse.y);
        const glow = Math.sin(this.pulse) * 0.5 + 0.5;
        return this.size + glow + (distance < 180 ? (180 - distance) / 65 : 0);
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius(), 0, Math.PI * 2);
        ctx.fillStyle = "#22c55e";
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#22c55e";
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Atom {
    constructor() {
        const type = ATOM_TYPES[Math.floor(Math.random() * ATOM_TYPES.length)];
        this.symbol = type.symbol;
        this.color = type.color;
        this.mass = type.mass;
        this.baseRadius = 10 + Math.random() * 6;
        this.x = this.baseRadius + Math.random() * Math.max(1, w - this.baseRadius * 2);
        this.y = this.baseRadius + Math.random() * Math.max(1, h - this.baseRadius * 2);
        this.vx = (Math.random() - 0.5) * 0.58;
        this.vy = (Math.random() - 0.5) * 0.58;
        this.id = nextAtomId++;
        this.bonds = new Set();
    }

    radius() {
        const distance = Math.hypot(this.x - mouse.x, this.y - mouse.y);
        return this.baseRadius + (distance < 180 ? (180 - distance) / 24 : 0);
    }

    update() {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.hypot(dx, dy) || 1;

        // The pointer gently pushes nearby atoms away instead of trapping them.
        if (distance < 150) {
            const force = (150 - distance) / 150 * 0.025;
            this.vx += dx / distance * force;
            this.vy += dy / distance * force;
        }

        const speed = Math.hypot(this.vx, this.vy);
        if (speed > 1.45) {
            this.vx = this.vx / speed * 1.45;
            this.vy = this.vy / speed * 1.45;
        }

        this.x += this.vx;
        this.y += this.vy;

        const radius = this.radius();
        if (this.x < radius || this.x > w - radius) this.vx *= -1;
        if (this.y < radius || this.y > h - radius) this.vy *= -1;

        this.x = Math.max(radius, Math.min(w - radius, this.x));
        this.y = Math.max(radius, Math.min(h - radius, this.y));
    }

    draw() {
        const radius = this.radius();

        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}22`;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1.4;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = this.color;
        ctx.font = `600 ${Math.max(10, radius * 0.72)}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.symbol, this.x, this.y + 0.5);
    }
}

function resolveAtomCollision(first, second) {
    if (pendingExplosions.has(first) || pendingExplosions.has(second)) return;

    const dx = second.x - first.x;
    const dy = second.y - first.y;
    const distance = Math.hypot(dx, dy) || 0.001;
    const minDistance = first.radius() + second.radius() + 4;
    const key = contactKey(first, second);

    if (distance >= minDistance) {
        activeContacts.delete(key);
        return;
    }

    const isNewContact = !activeContacts.has(key);
    activeContacts.add(key);

    const nx = dx / distance;
    const ny = dy / distance;
    const overlap = minDistance - distance;

    first.x -= nx * overlap / 2;
    first.y -= ny * overlap / 2;
    second.x += nx * overlap / 2;
    second.y += ny * overlap / 2;

    // Atoms may stay in contact while the cursor enlarges them.
    // A reaction is considered only once, at the start of that contact.
    if (!isNewContact) return;

    // Elastic collision: objects leave in opposing directions.
    const relativeVelocity = (first.vx - second.vx) * nx + (first.vy - second.vy) * ny;
    if (relativeVelocity <= 0) return;

    const impulse = 2 * relativeVelocity / (1 / first.mass + 1 / second.mass);
    first.vx -= impulse / first.mass * nx;
    first.vy -= impulse / first.mass * ny;
    second.vx += impulse / second.mass * nx;
    second.vy += impulse / second.mass * ny;

    if (isReactivePair(first, second)) {
        triggerExplosion(first, second);
        return;
    }

    if (canCreateBond(first, second) && Math.random() < 0.72) {
        createBond(first, second);
    }
}

function contactKey(first, second) {
    return first.id < second.id ? `${first.id}:${second.id}` : `${second.id}:${first.id}`;
}

function reactiveKey(first, second) {
    return first.symbol < second.symbol
        ? `${first.symbol}:${second.symbol}`
        : `${second.symbol}:${first.symbol}`;
}

function isReactivePair(first, second) {
    return REACTIVE_PAIRS.has(reactiveKey(first, second));
}

function areBonded(first, second) {
    return Array.from(first.bonds).some(bond =>
        (bond.first === first && bond.second === second) ||
        (bond.first === second && bond.second === first)
    );
}

function canCreateBond(first, second) {
    return first.bonds.size < MAX_BONDS_PER_ATOM &&
        second.bonds.size < MAX_BONDS_PER_ATOM &&
        !areBonded(first, second);
}

function createWave(x, y) {
    waves.push({ x, y, radius: 4, opacity: 0.95 });
}

function triggerExplosion(first, second) {
    if (pendingExplosions.has(first) || pendingExplosions.has(second)) return;

    const affectedAtoms = new Set([
        ...getBondGroup(first),
        ...getBondGroup(second)
    ]);
    const centerX = Array.from(affectedAtoms).reduce((sum, atom) => sum + atom.x, 0) / affectedAtoms.size;
    const centerY = Array.from(affectedAtoms).reduce((sum, atom) => sum + atom.y, 0) / affectedAtoms.size;

    affectedAtoms.forEach(atom => pendingExplosions.add(atom));
    explosions.push({ x: centerX, y: centerY, radius: 4, opacity: 1 });
}

function getBondGroup(startAtom) {
    const group = new Set([startAtom]);
    const queue = [startAtom];

    while (queue.length) {
        const atom = queue.shift();
        atom.bonds.forEach(bond => {
            const connectedAtom = bond.first === atom ? bond.second : bond.first;
            if (!group.has(connectedAtom)) {
                group.add(connectedAtom);
                queue.push(connectedAtom);
            }
        });
    }

    return group;
}

function processExplosions() {
    if (!pendingExplosions.size) return;

    const replacementCount = pendingExplosions.size;
    pendingExplosions.forEach(atom => removeAtom(atom));
    pendingExplosions.clear();

    window.setTimeout(() => {
        for (let i = 0; i < replacementCount; i++) atoms.push(new Atom());
    }, 900);
}

function removeAtom(atom) {
    for (let i = bonds.length - 1; i >= 0; i--) {
        const bond = bonds[i];
        if (bond.first !== atom && bond.second !== atom) continue;
        bond.first.bonds.delete(bond);
        bond.second.bonds.delete(bond);
        bonds.splice(i, 1);
    }

    activeContacts.forEach(key => {
        const [firstId, secondId] = key.split(":").map(Number);
        if (firstId === atom.id || secondId === atom.id) activeContacts.delete(key);
    });

    const index = atoms.indexOf(atom);
    if (index !== -1) atoms.splice(index, 1);
}

function relocateRandomAtom() {
    if (!atoms.length) return;

    const atom = atoms[Math.floor(Math.random() * atoms.length)];
    createWave(atom.x, atom.y);
    removeAtom(atom);

    window.setTimeout(() => {
        const replacement = new Atom();
        atoms.push(replacement);
        createWave(replacement.x, replacement.y);
    }, 700);
}

function createBond(first, second) {
    const dx = second.x - first.x;
    const dy = second.y - first.y;
    const distance = Math.hypot(dx, dy) || 1;
    const length = first.baseRadius + second.baseRadius + 12;
    const bond = {
        first,
        second,
        length,
        expiresAt: performance.now() + (30 + Math.random() * 30) * 1000
    };

    // The first wave is emitted only when a new connection is formed.
    createWave((first.x + second.x) / 2, (first.y + second.y) / 2);
    first.bonds.add(bond);
    second.bonds.add(bond);
    bonds.push(bond);
}

function updateBonds(now) {
    for (let i = bonds.length - 1; i >= 0; i--) {
        const bond = bonds[i];
        if (now >= bond.expiresAt) {
            releaseBond(bond, i);
        }
    }

    // Repeated position corrections create fixed-length rods, including stable 3+ atom groups.
    for (let iteration = 0; iteration < 3; iteration++) {
        bonds.forEach(enforceRigidBond);
    }
}

function enforceRigidBond(bond) {
    const { first, second } = bond;
    const dx = second.x - first.x;
    const dy = second.y - first.y;
    const distance = Math.hypot(dx, dy) || 0.001;
    const nx = dx / distance;
    const ny = dy / distance;
    const correction = (distance - bond.length) / 2;

    first.x += nx * correction;
    first.y += ny * correction;
    second.x -= nx * correction;
    second.y -= ny * correction;

    // Remove only radial relative motion; the connected group can still rotate and fly freely.
    const radialVelocity = (second.vx - first.vx) * nx + (second.vy - first.vy) * ny;
    first.vx += nx * radialVelocity / 2;
    first.vy += ny * radialVelocity / 2;
    second.vx -= nx * radialVelocity / 2;
    second.vy -= ny * radialVelocity / 2;
}

function releaseBond(bond, index) {
    const { first, second } = bond;
    const dx = second.x - first.x;
    const dy = second.y - first.y;
    const distance = Math.hypot(dx, dy) || 1;
    const nx = dx / distance;
    const ny = dy / distance;

    createWave((first.x + second.x) / 2, (first.y + second.y) / 2);
    first.vx -= nx * 0.75;
    first.vy -= ny * 0.75;
    second.vx += nx * 0.75;
    second.vy += ny * 0.75;
    first.bonds.delete(bond);
    second.bonds.delete(bond);
    bonds.splice(index, 1);
}

function drawBonds() {
    bonds.forEach(({ first, second }) => {
        ctx.beginPath();
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.strokeStyle = "rgba(148, 163, 184, 0.78)";
        ctx.lineWidth = 4;
        ctx.shadowBlur = 0;
        ctx.stroke();
        ctx.shadowBlur = 0;
    });
}

function updateAndDrawWaves() {
    for (let i = waves.length - 1; i >= 0; i--) {
        const wave = waves[i];
        wave.radius += 1.75;
        wave.opacity -= 0.022;

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 255, 142, ${Math.max(0, wave.opacity)})`;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 16;
        ctx.shadowColor = "#22ff8e";
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (wave.opacity <= 0) waves.splice(i, 1);
    }
}

function updateAndDrawExplosions() {
    for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i];
        explosion.radius += 2.3;
        explosion.opacity -= 0.028;

        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(251, 146, 60, ${Math.max(0, explosion.opacity)})`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 18;
        ctx.shadowColor = "#fb923c";
        ctx.stroke();

        const rayLength = explosion.radius + 10;
        for (let ray = 0; ray < 8; ray++) {
            const angle = ray * Math.PI / 4;
            ctx.beginPath();
            ctx.moveTo(explosion.x + Math.cos(angle) * explosion.radius * 0.55,
                explosion.y + Math.sin(angle) * explosion.radius * 0.55);
            ctx.lineTo(explosion.x + Math.cos(angle) * rayLength,
                explosion.y + Math.sin(angle) * rayLength);
            ctx.stroke();
        }
        ctx.shadowBlur = 0;

        if (explosion.opacity <= 0) explosions.splice(i, 1);
    }
}

function drawReactionHints() {
    for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
            const first = atoms[i];
            const second = atoms[j];
            if (pendingExplosions.has(first) || pendingExplosions.has(second) || !isReactivePair(first, second)) continue;

            const distance = Math.hypot(second.x - first.x, second.y - first.y);
            if (distance >= REACTION_HINT_DISTANCE) continue;

            const intensity = (REACTION_HINT_DISTANCE - distance) / REACTION_HINT_DISTANCE;
            drawExplosionHint((first.x + second.x) / 2, (first.y + second.y) / 2, intensity);
        }
    }
}

function drawExplosionHint(x, y, intensity) {
    const radius = 3 + intensity * 4;
    ctx.strokeStyle = `rgba(251, 191, 36, ${0.3 + intensity * 0.65})`;
    ctx.fillStyle = `rgba(251, 146, 60, ${0.25 + intensity * 0.55})`;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#f59e0b";
    ctx.beginPath();
    for (let point = 0; point < 10; point++) {
        const angle = -Math.PI / 2 + point * Math.PI / 5;
        const pointRadius = point % 2 ? radius * 0.45 : radius;
        const px = x + Math.cos(angle) * pointRadius;
        const py = y + Math.sin(angle) * pointRadius;
        if (point === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function keepAtomsAwayFromDots() {
    atoms.forEach(atom => {
        dots.forEach(dot => {
            const dx = atom.x - dot.x;
            const dy = atom.y - dot.y;
            const distance = Math.hypot(dx, dy) || 0.001;
            const safeDistance = atom.radius() + dot.radius() + 3;

            if (distance < safeDistance) {
                const nx = dx / distance;
                const ny = dy / distance;
                const push = safeDistance - distance;
                atom.x += nx * push;
                atom.y += ny * push;
                atom.vx += nx * 0.02;
                atom.vy += ny * 0.02;
            }
        });
    });
}

function keepAtomsAwayFromContent() {
    atoms.forEach(atom => {
        contentObstacles.forEach(obstacle => {
            const radius = atom.radius() + 10;
            const left = obstacle.left - radius;
            const right = obstacle.right + radius;
            const top = obstacle.top - radius;
            const bottom = obstacle.bottom + radius;

            if (atom.x < left || atom.x > right || atom.y < top || atom.y > bottom) return;

            const distances = [
                { value: Math.abs(atom.x - left), side: "left" },
                { value: Math.abs(right - atom.x), side: "right" },
                { value: Math.abs(atom.y - top), side: "top" },
                { value: Math.abs(bottom - atom.y), side: "bottom" }
            ];
            const nearest = distances.reduce((current, candidate) =>
                candidate.value < current.value ? candidate : current
            );

            if (nearest.side === "left") {
                atom.x = left;
                atom.vx = -Math.abs(atom.vx);
            } else if (nearest.side === "right") {
                atom.x = right;
                atom.vx = Math.abs(atom.vx);
            } else if (nearest.side === "top") {
                atom.y = top;
                atom.vy = -Math.abs(atom.vy);
            } else {
                atom.y = bottom;
                atom.vy = Math.abs(atom.vy);
            }
        });
    });
}

function drawLines() {
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const distance = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
            if (distance >= 120) continue;

            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(34,197,94,${(1 - distance / 120) * 0.12})`;
            ctx.stroke();
        }
    }
}

function animate(now) {
    ctx.clearRect(0, 0, w, h);

    dots.forEach(dot => dot.update());
    atoms.forEach(atom => atom.update());

    for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
            resolveAtomCollision(atoms[i], atoms[j]);
        }
    }

    processExplosions();
    updateBonds(now);
    keepAtomsAwayFromDots();
    keepAtomsAwayFromContent();
    updateAndDrawWaves();
    updateAndDrawExplosions();
    drawReactionHints();
    drawBonds();
    atoms.forEach(atom => atom.draw());
    drawLines();
    dots.forEach(dot => dot.draw());

    requestAnimationFrame(animate);
}

resize();

window.addEventListener("resize", resize);
window.addEventListener("load", resize);
window.addEventListener("scroll", refreshContentObstacles, { passive: true });
window.addEventListener("mousemove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY + window.scrollY;
});
window.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

window.setInterval(relocateRandomAtom, 60_000);

animate();
