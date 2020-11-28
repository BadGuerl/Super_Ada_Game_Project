class Weapon {
    
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.vx = 5;
        this.y = y;

        this.sprite = new Image();
        this.sprite.src = "assets/img/weapon.png";
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 5;
        this.sprite.verticalFrames = 1;
        this.sprite.isReady = false;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWhith = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWhith;
            this.height = this.sprite.frameHeight;
        };
        this.movements = {
            left: false
        };
        this.drawCount = 0;
    }

    animate() {
        if (this.drawCount % MOVEMENT_FRAMES === 0) {
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
            this.drawCount = 0;
        }
    }

    animateSprite(initialVerticalFrame, initialHorizontalFrame, segments, frequency) {
        if (initialVerticalFrame !== this.sprite.verticalFrameIndex) {
            this.sprite.verticalFrameIndex = initialVerticalFrame;
            this.sprite.horizontalFrameIndex =  initialHorizontalFrame;
        } else if (this.drawCount % frequency === 0) {
            this.sprite.horizontalFrameIndex++;
            if (this.sprite.horizontalFrameIndex === segments) {
                this.sprite.horizontalFrameIndex =0;
                this.drawCount = 0;
            }
        }
    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWhith,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWhith,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
            this.sprite.drawCount++;
            this.animate();
        }
    }

    move() {
       if (this.movements.left) {
        this.x -= SPEED;
        }
    }

    animate () {
        if (this.drawCount % MOVEMENT_FRAMES === 0) {
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
            this.drawCount = 0;
        }
    }
}