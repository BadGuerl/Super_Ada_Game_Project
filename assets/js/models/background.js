class Background {

    constructor(ctx) {
        this.ctx = ctx;

        this.x = 0;
        this.y = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.vx = -3;

        this.img = new Image();
        this.img.src = './assets/img/City.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }
        this.movement = {
            right: false,
            left: false,
            up: false,
            down: false
        }
    }

    isReady() {
        return this.img.isReady;
    }

    onKeyEvent(event) {
        const state = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_RIGHT:
                this.movement.right = state;
                break;
            case KEY_LEFT:
                this.movement.left = state;
                break;
            case KEY_UP:
                this.movement.left = state;
                break;
            case KEY_DOWN:
                this.movement.left = state;
                break;
        }
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            )
            this.ctx.drawImage(
                this.img,
                this.x + this.width,
                this.y,
                this.width,
                this.height
            )
        }
    }

    move() {
        if (this.movement.right) {
            this.x += this.vx;
            if (this.x + this.width <= 0) {
                this.x = 0;
            }
        }
    }
}