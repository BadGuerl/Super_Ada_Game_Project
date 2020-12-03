class Pura extends Enemy {
    constructor(ctx, x, y) {
        super(ctx, x, y);
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.sprite = new Image();
        this.sprite.src = './assets/img/enemy2.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 4;
        this.sprite.verticalFrames = 1;


        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        };
        this.movements = {
            left: false
        };
        this.drawCount = 0;
    }
}