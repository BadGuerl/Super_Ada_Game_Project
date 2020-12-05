class Shield {
    
    constructor(ctx, x, y) {

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = './assets/img/shield.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                this.img.x,
                this.img.y,
                this.img.width,
                this.img.height
            );
        }
    }

}