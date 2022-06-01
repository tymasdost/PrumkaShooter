export class Enemyship {
    constructor(x) {
        this.x = x;
        this.y = -50;
        this.size = {
            width: 50,
            height: 50
        }

        this.img = new Image();
        this.path = `./res/img/${Math.ceil(Math.random() * 5)}.png`;
        this.img.src = this.path;


    }

    draw(ctx) {
        //ctx.drawImage(this.x, 0 + this.size.width + 10, this.size.width, this.size.height)
        ctx.drawImage(this.img, this.x, this.y, this.size.width, this.size.height)
    }
}