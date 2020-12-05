class Shield {
    
    constructor(ctx, x, y) {

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;
        this.img = new Image();
        this.img.src = './assets/img/shield.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
            // this.width = this.img.width;
            // this.height = this.img.height;
        }
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                // this.img.x,
                // this.img.y,
                this.img.width,
                this.img.height
            );
        }
    }

}