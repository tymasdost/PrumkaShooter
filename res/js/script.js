import { Shooter } from "./asiscript/shooter.js"
import { Bullet } from "./asiscript/shooting.js"
import { Enemyship } from "./asiscript/entityspawn.js"

const shooter = new Shooter();
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 700;
let ready = true;

let ShooterX = canvas.width / 2 - shooter.size.width / 2;
let ShooterY = 550;

let enemy = [];
let bullet = [];
const keys = {};
let score = 0;

document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
    if (e.code == "Space" && ready) {
        bullet.push(new Bullet(ShooterX, ShooterY))
        ready = false;
        setTimeout(()=> {
            ready = true;
        }, 250)
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

const move = () => {
    if (keys['ArrowRight']  &&  ShooterX < canvas.width - shooter.size.width + 5) ShooterX += 7;
    if (keys['ArrowLeft']   &&  ShooterX > 5 ) ShooterX -= 7;    
}


setInterval(()=>{
    enemy.push(new Enemyship(Math.random() * (canvas.width - 50)))
    enemy.forEach((object) => {
        object.y += 60;
    });
    
}, 1000);


const resizeCanvas = () => {
    canvas.width = 500;
    canvas.height = 700;
    let bg = new Image();
    bg.src = "./res/img/hic.jpg";
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)
};



const gameLoop = () => {
    resizeCanvas();

    Score();

    drawEntity();

    Collisions();

    

    move();

    window.requestAnimationFrame(gameLoop);
};

const Collisions = () => {

    bullet.forEach((ammo, bI)=>{
            enemy.forEach((entit, eI) => {
            if (
                entit.x < ammo.x + ammo.size.width &&
                entit.x + entit.size.width > ammo.x &&
                entit.y + entit.size.height > ammo.y
        
            ) {
                Explode(ammo.x, ammo.y);
                enemy.splice(eI, 1)
                bullet.splice(bI, 1)
                score += 50;
            }


        });
    });
}

const Explode = (x,y)=> {
    let myGif = new Image();
    myGif.src = "./res/img/bum.gif";
    ctx.drawImage(myGif, x - 30, y - 30, 60, 60)
    
    
}

const Score = () => {
    ctx.fillStyle = "white";
    ctx.font = '20px serif';
    ctx.textAlign = "center"
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height - 10)
}

const drawEntity = () => {
    shooter.draw(ctx, ShooterX, ShooterY);

    bullet.forEach((object, index) => {
        if (object.y < 0) bullet.splice(index, index + 1)
        object.draw(ctx) 
        object.shoot()
    });
    enemy.forEach((object, index) => {
        if (object.y > canvas.height - 200) {
            ShooterX = canvas.width / 2 + shooter.size.width;
            ShooterY = 550;
            enemy = [];
            bullet = [];
            score = 0;
        }
        object.draw(ctx) 
    });
    
}





window.onload = () => {
    resizeCanvas();

    window.requestAnimationFrame(gameLoop);
  };


