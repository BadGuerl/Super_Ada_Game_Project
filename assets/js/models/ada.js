class Ada {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.maxX = this.ctx.canvas.width / 4;
        this.minX = 0;
        this.vx = 0;

        this.y = y;
        this.vy = 0;
        this.maxY = this.ctx.canvas.height - 140;
        this.minY = Math.floor(this.ctx.canvas.height / 1.7);

        this.width = 0;
        this.height = 0;

        this.sprite = new Image();
        this.sprite.src = './assets/img/ada.sprite.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 4;
        this.sprite.verticalFrames = 6;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.drawCount = 0;

        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        }

        this.movements = {
            right: false,
            left: false,
            up: false,
            down: false,
            defending: false
        }
        this.drawCount = 0;

        this.sounds = {
            defend: new Audio('./assets/sound/yah.mp3')
        }
    }

    isReady() {
        return this.sprite.isReady;
    }

    onKeyEvent(event) {
        const status = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_RIGHT:
                this.movements.right = status;
                break;
            case KEY_LEFT:
                this.movements.left = status;
                break;
            case KEY_UP:
                this.movements.up = status;
                break;
            case KEY_DOWN:
                this.movements.down = status;
                break;
            case KEY_DEFENDING:
                this.movements.defending = status;
                if(status){
                    this.sounds.defend.currentTime = 0;
                    this.sounds.defend.play();
                } else {
                    this.sounds.defend.pause();
                }
                
                break;
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
            this.sprite.drawCount++;
            this.animate();
        }
    }

    move() {
        if (this.movements.right) {
            this.vx = SPEED;
        } else if (this.movements.left) {
            this.vx = -SPEED;
        } else if (this.movements.up) {
            this.vy = -SPEED;
        } else if (this.movements.down) {
            this.vy = SPEED;
        } else if (this.defendPoints >= 10) {
            this.vy = -SPEED;
        } else {
            this.vx = 0;
            this.vy = 0;
        }

        this.x += this.vx;
        this.y += this.vy;

        if (this.x >= this.maxX) {
            this.x = this.maxX;
        } else if (this.x <= this.minX) {
            this.x = this.minX;
        }

        if (this.y >= this.maxY) {
            this.y = this.maxY;
        } else if (this.y <= this.minY) {
            this.y = this.minY;
            this.vy = 0;
        }
    }

    animate() {
        if (this.movements.right) {
            this.animateSprite(2, 0, 4, 5);
        } else if (this.movements.left) {
            this.animateSprite(1, 0, 4, 5);
        } else if (this.movements.up) {
            this.animateSprite(3, 0, 3, 5);
        } else if (this.movements.down) {
            this.animateSprite(0, 0, 4, 5);
        } else if (this.movements.defending) {
            this.animateSprite(4, 0, 0, 0);
        } else {
            this.resetAnimation();
        }
    }

    animateWin() {
        //if(this.defendPoints >= 10) {
            this.animateSprite(5, 0, 0, 0);
        //}
    }
    
    resetAnimation() {
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrameIndex = 0;
        }

    animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
        if (this.sprite.verticalFrameIndex != initialVerticalIndex) {
            this.sprite.verticalFrameIndex = initialVerticalIndex;
            this.sprite.horizontalFrameIndex = initialHorizontalIndex;
        } else if (this.sprite.drawCount % frequency === 0) {
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % maxHorizontalIndex;
            this.sprite.drawCount = 0;
        }
    }

    animateSpriteWin(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
        if (this.sprite.verticalFrameIndex != initialVerticalIndex) {
            this.sprite.verticalFrameIndex = initialVerticalIndex;
            this.sprite.horizontalFrameIndex = initialHorizontalIndex;
        } else if (this.sprite.drawCount % frequency === 0) {
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % maxHorizontalIndex;
            this.sprite.drawCount = 0;
        }
    }

    collidesWidth(element) {
        // return this.x < element.x + element.width &&
        //     this.x + this.width > element.x &&
        //     this.y + 50 < element.y + element.height &&
        //     this.y + this.height - 50 > element.y;
            // this.animate.movements === !this.movements.defending;
     
        if (this.x < element.x + element.width &&
            this.x + this.width > element.x &&
            this.y + 50 < element.y + element.height &&
            this.y + this.height - 50 > element.y) {
            // element.clearWeapon = true;
            element.sprite.src = "";
            return true;
        } else {
            return false;
        }
    }

    clear() {

    }
}