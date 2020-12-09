class Enemy {

    constructor(ctx, x, y, name) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.sprite = new Image();
        this.sprite.src = `./assets/img/${name}.png`;
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
        this.weapon = false;
        this.comment = false;
        setTimeout(() => {
            this.weapon = new Weapon(this.ctx, this.x, this.y + 50);
            this.comment = new Comment(this.ctx, this.x, this.y - 80);
            this.sounds.cuchillo.currentTime = 0;
            this.sounds.cuchillo.play();
        }, 500);

        this.sounds = {
            cuchillo: new Audio('./assets/sound/cuchillo.mp3')
        }
    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(

                this.sprite,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            )
            if (this.weapon != false && this.comment != false) {
                // if (!this.weapon.clearWeapon) {
                    this.weapon.draw();
                // }

                this.comment.draw();
            }
            
            // this.weapons.map(weapon => weapon.draw());
            this.drawCount++;
            this.animate();
            // this.checkCollisions();
        }
    }

    move() {
        if (this.x > 0 - this.width) {
            this.x -= SPEED;
        }
    }

    animate() {
        if (this.drawCount % MOVEMENT_FRAMES === 0) {
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % this.sprite.horizontalFrames;
            this.drawCount = 0;
        }
        this.move();
    }
}