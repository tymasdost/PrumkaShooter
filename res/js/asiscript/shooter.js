export class Shooter {
    constructor() {
        this.size = {
            width: 70,
            height: 110
        }
        this.img = new Image();
        this.path = "./res/img/raketa.png";
        this.img.src = this.path;
    }


    draw(ctx, x, y) {
        ctx.drawImage(this.img, x, y, this.size.width, this.size.height)
        
    }



}