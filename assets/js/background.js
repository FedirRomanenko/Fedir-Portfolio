const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

let w = 0;
let h = 0;
let pixelRatio = 1;

const mouse = { x: -1000, y: -1000 };
const dots = [];
const atoms = [];

const DOT_COUNT = 180;
const ATOM_COUNT = window.innerWidth < 700 ? 8 : 14;
const ATOM_TYPES = [
    { symbol: "H", color: "#7dd3fc", mass: 1 },
    { symbol: "O", color: "#fb7185", mass: 16 },
    { symbol: "C", color: "#cbd5e1", mass: 12 },
    { symbol: "N", color: "#a78bfa", mass: 14 },
    { symbol: "He", color: "#fbbf24", mass: 4 }
];

function resize() {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * pixelRatio);
    canvas.height = Math.floor(h * pixelRatio);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
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
        this.vx = (Math.random() - 0.5) * 0.42;
        this.vy = (Math.random() - 0.5) * 0.42;
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
        if (speed > 1.15) {
            this.vx = this.vx / speed * 1.15;
            this.vy = this.vy / speed * 1.15;
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
    const dx = second.x - first.x;
    const dy = second.y - first.y;
    const distance = Math.hypot(dx, dy) || 0.001;
    const minDistance = first.radius() + second.radius() + 4;

    if (distance >= minDistance) return;

    const nx = dx / distance;
    const ny = dy / distance;
    const overlap = minDistance - distance;

    first.x -= nx * overlap / 2;
    first.y -= ny * overlap / 2;
    second.x += nx * overlap / 2;
    second.y += ny * overlap / 2;

    // Elastic collision: objects leave in opposing directions.
    const relativeVelocity = (first.vx - second.vx) * nx + (first.vy - second.vy) * ny;
    if (relativeVelocity <= 0) return;

    const impulse = 2 * relativeVelocity / (1 / first.mass + 1 / second.mass);
    first.vx -= impulse / first.mass * nx;
    first.vy -= impulse / first.mass * ny;
    second.vx += impulse / second.mass * nx;
    second.vy += impulse / second.mass * ny;
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

function animate() {
    ctx.clearRect(0, 0, w, h);

    dots.forEach(dot => dot.update());
    atoms.forEach(atom => atom.update());

    for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
            resolveAtomCollision(atoms[i], atoms[j]);
        }
    }

    keepAtomsAwayFromDots();
    atoms.forEach(atom => atom.draw());
    drawLines();
    dots.forEach(dot => dot.draw());

    requestAnimationFrame(animate);
}

resize();
for (let i = 0; i < DOT_COUNT; i++) dots.push(new Dot());
for (let i = 0; i < ATOM_COUNT; i++) atoms.push(new Atom());

window.addEventListener("resize", resize);
window.addEventListener("mousemove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});
window.addEventListener("mouseleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

animate();
