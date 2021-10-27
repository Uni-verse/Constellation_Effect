const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
let hue = 0;

canvas.style.backgroundColor = 'black';

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', function(e){
    for(let i = 0; i < 100; i++){
        particlesArray.push(new Particle());
    }
})

canvas.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    for(let i = 0; i < 1; i++){
        particlesArray.push(new Particle());
    }
})

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 5 - 2.5;
        this.speedY = Math.random() * 5 - 2.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.05;
        
    }
    draw(){
        ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

}

function handleParticles(){
     for(let i = 0; i < particlesArray.length; i++){
        if(particlesArray[i].x < particlesArray[i].size) particlesArray[i].speedX *= -1;
        if(particlesArray[i].y < particlesArray[i].size) particlesArray[i].speedY *= -1;
        if(particlesArray[i].x > canvas.width - particlesArray[i].size) particlesArray[i].speedX *= -1;
        if(particlesArray[i].y > canvas.height - particlesArray[i].size) particlesArray[i].speedY *= -1;
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i; j < particlesArray.length; j++){
            const dx = particlesArray[i].x - particlesArray[j].x
            const dy = particlesArray[i].y - particlesArray[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 75){
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size/5;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }

        if (particlesArray[i].size <= 0.3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
}
function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    handleParticles();
    hue+=0.5;
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "white";
    ctx.fillText(particlesArray.length, canvas.width/2, canvas.height/2);
    requestAnimationFrame(animate);
}

animate();