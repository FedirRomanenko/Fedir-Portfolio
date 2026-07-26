const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

let w, h;

const mouse = {
    x: -1000,
    y: -1000
};

function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

const dots = [];

const COUNT = 180;

class Dot{

    constructor(){

        this.x=Math.random()*w;
        this.y=Math.random()*h;

        this.vx=(Math.random()-0.5)*0.12;
        this.vy=(Math.random()-0.5)*0.12;

        this.size=Math.random()*1.8+1;

        this.pulse=Math.random()*Math.PI*2;

    }

    update(){

        this.x+=this.vx;
        this.y+=this.vy;

        if(this.x<0||this.x>w)this.vx*=-1;
        if(this.y<0||this.y>h)this.vy*=-1;

        this.pulse+=0.03;

    }

    draw(){

        const dx=this.x-mouse.x;
        const dy=this.y-mouse.y;

        const dist=Math.sqrt(dx*dx+dy*dy);

        let glow=Math.sin(this.pulse)*0.5+0.5;

        let r=this.size+glow;

        if(dist<180){

            r+=(180-dist)/65;

        }

        ctx.beginPath();

        ctx.arc(this.x,this.y,r,0,Math.PI*2);

        ctx.fillStyle="#22c55e";

        ctx.shadowBlur=18;

        ctx.shadowColor="#22c55e";

        ctx.fill();

        ctx.shadowBlur=0;

    }

}

for(let i=0;i<COUNT;i++){

    dots.push(new Dot());

}

window.addEventListener("mousemove",e=>{

    mouse.x=e.clientX;
    mouse.y=e.clientY;

});

function drawLines(){

    for(let i=0;i<dots.length;i++){

        for(let j=i+1;j<dots.length;j++){

            let dx=dots[i].x-dots[j].x;
            let dy=dots[i].y-dots[j].y;

            let d=Math.sqrt(dx*dx+dy*dy);

            if(d<120){

                ctx.beginPath();

                ctx.moveTo(dots[i].x,dots[i].y);

                ctx.lineTo(dots[j].x,dots[j].y);

                ctx.strokeStyle="rgba(34,197,94,"+(1-d/120)*0.12+")";

                ctx.stroke();

            }

        }

    }

}

function drawHexGrid(){

    const size=48;

    ctx.strokeStyle="rgba(255,255,255,.025)";

    ctx.lineWidth=1;

    for(let y=-size;y<h+size;y+=size*0.86){

        for(let x=-size;x<w+size;x+=size*1.5){

            const offset=(Math.floor(y/size)%2)*(size*0.75);

            ctx.beginPath();

            for(let i=0;i<6;i++){

                const angle=Math.PI/3*i;

                const px=x+offset+Math.cos(angle)*size/2;

                const py=y+Math.sin(angle)*size/2;

                if(i===0) ctx.moveTo(px,py);
                else ctx.lineTo(px,py);

            }

            ctx.closePath();

            ctx.stroke();

        }

    }

}

function animate(){

    ctx.clearRect(0,0,w,h);

    drawHexGrid();

    drawLines();

    dots.forEach(dot=>{

        dot.update();

        dot.draw();

    });

    requestAnimationFrame(animate);

}

animate();