class Enemy {

    constructor(ctx, x, y, mode) {
        this.ctx = ctx;
        this.x = x;
        this.maxX = this.ctx.canvas.width / 2;
        this.minX = 0;
        this.vx = 0;
        this.mode = mode;

        this.y = y;
        this.vy = 0;
        this.maxY = this.y;

        this.width = 0;
        this.height = 0;

        this.sprite = new Image();
        this.sprite.src = './assets/img/enemy5.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 4;
        this.sprite.verticalFrames = 1;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.drawCount = 0;
        this.sprite.onload = () => {
          this.sprite.isReady = true;
        };

        this.drawCount = 0;
    }

    isReady()  {
        return this.sprite.isReady;
    }

    draw() {
        if (this.sprite.isReady) {
            let ySeek = 0;
            switch (this.mode) {
                case 'bottom':
                    ySeek = (this.height > this.sprite.height) ? 0 : this.sprite.height - this.height;
                break;
            }
            this.ctx.drawImage(
                this.sprite,
                0,
                ySeek,
                Math.min(this.sprite.width, this.width),
                Math.min(this.sprite.height, this.height),
                this.x,
                this.y,
                this.width,
                this.height
            );
        }

    }

    move() {
        this.x -= this.vx;
    }
}