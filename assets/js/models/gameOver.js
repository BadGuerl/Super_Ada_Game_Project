class Gameover {
    
    constructor(ctx, x, y) {

        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;
        this.img = new Image();
        this.img.src = './assets/img/end.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }
        this.sounds = {
            end: new Audio('./assets/sound/end.mp3')
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

        this.sounds.end.currentTime = 0;
        this.sounds.end.play();
    }
}