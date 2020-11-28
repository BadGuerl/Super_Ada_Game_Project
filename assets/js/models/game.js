 class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1366;
        this.canvas.height = 768;
        this.ctx = this.canvas.getContext('2d');

        this.fps = 1000 / 60;
        this.drawIntervalId = undefined;

        this.background = new Background(this.ctx);
        this.ada = new Ada(this.ctx, 15, 550);

        this.weapons = [
<<<<<<< HEAD
            new Weapon(this.ctx, 150, 600)
=======
            new Weapon(this.ctx, this.ada.x + 800, this.ada.y + 50)
>>>>>>> e57ae4ccc6443b193fe8fa4777b2b1dcb2c1db55
        ];
    }

    onKeyEvent(event) {
        this.ada.onKeyEvent(event);
        this.background.onKeyEvent(event);
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
            }, this.fps)
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ada.clear();
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    draw() {
        this.background.draw();
        this.ada.draw();
        this.weapons.forEach(weapon => weapon.draw());
    }

    move() {
        if (this.ada.x >= this.ada.maxX) {
            this.weapons.forEach(weapon => weapon.move());
            this.background.move();
            this.weapons.forEach(weapon => weapon.move());
        } 
        this.ada.move();
    }
}