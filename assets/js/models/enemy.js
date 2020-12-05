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
        this.weapon = new Weapon(this.ctx, this.x, this.y + 50);
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
            this.weapon.draw();
            this.drawCount++;
            this.animate();
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

// let enemy1 = new Enemy(enemy1);
// let enemy2 = new Enemy(enemy2);
// let enemy3 = new Enemy(enemy3);
// let enemy4 = new Enemy(enemy4);
// let enemy5 = new Enemy(enemy5);
// let enemy6 = new Enemy(enemy6);
// let enemy7 = new Enemy(enemy7);
// let enemy8 = new Enemy(enemy8);
// let enemy9 = new Enemy(enemy9);
// let enemy10 = new Enemy(enemy10);