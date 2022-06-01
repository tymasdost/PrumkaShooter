export class Bullet {
    constructor(x, y) {
        this.size = {
            width: 5,
            height: 20
        }
        this.x = x + 32 - this.size.width / 2;
        this.y = y - 20;
        this.img = new Image();
        this.path = "./res/img/doutnak.png";
        this.img.src = this.path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y , this.size.width, this.size.height)
    }

    shoot() {
        setInterval(()=> {
            this.y--
         }, 60)
    }
}