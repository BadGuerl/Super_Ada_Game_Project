class GameOver {
    
    constructor(ctx, x, y) {

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;
        this.img = new Image();
        this.img.src = './assets/img/gameOver.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.img.width,
                this.img.height
            );
        }
        
        this.setScore(this.points);
        if (this.points <= 0) {
            this.GameOver.draw();
        }
    }

}