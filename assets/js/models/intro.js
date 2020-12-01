class Intro {

    constructor(ctx) {
        this.ctx = ctx;

        this.x = 0;
        this.y = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;

        this.img = new Image();
        this.img.src = './assets/img/intro.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
        }
    }

    isReady() {
        return this.img.isReady;
    }

    onKeyEvent(event) {
        const status = event.type === 'keypress';
        switch (event.keyCode) {
            case KEY_DEFENDING:
                game.start(event) = status;
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
}