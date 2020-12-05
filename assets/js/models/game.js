class Game {

    constructor(canvasId, introId) {
        this.canvas = document.getElementById(canvasId);
        this.intro = document.getElementById(introId);
        this.canvas.width = 1366;
        this.canvas.height = 768;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = "2.5em Rockwell";
        this.ctx.fillStyle = "#FFFFFF";

        this.fps = 1000 / 60;
        this.drawIntervalId = undefined;

        this.background = new Background(this.ctx);
        this.ada = new Ada(this.ctx, 15, 550);
        this.enemies = [
            new Enemy(this.ctx, this.canvas.width, 550, 'enemy1'),
            new Enemy(this.ctx, this.canvas.width + 100, 500, 'enemy2'),
            new Enemy(this.ctx, this.canvas.width + 300, 500, 'enemy3'),
            new Enemy(this.ctx, this.canvas.width + 400, 500, 'enemy4'),
            new Enemy(this.ctx, this.canvas.width + 480, 500, 'enemy5'),
            new Enemy(this.ctx, this.canvas.width + 500, 500, 'enemy6'),
            new Enemy(this.ctx, this.canvas.width + 650, 500, 'enemy7')
        ];

        this.heart = new Heart(this.ctx, 25, 15);
        this.points = 3;
    }


    start() {
        this.intro.style.display = "none";
        this.canvas.style.display = "block";
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.checkCollisions();
            }, this.fps)
        }
    }

    onKeyEvent(event) {
        this.ada.onKeyEvent(event);
        this.background.onKeyEvent(event);
        const status = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_START:
                this.start();
                break;
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

    startGame() {
        this.score = 0;
        this.weapons = [];
        this.ada.x = 0;
        this.ada.y = 0;
        this.start();
    }

    draw() {
        this.background.draw();
        this.ada.draw();
        this.weapons.forEach(weapon => weapon.draw());
        this.enemies.map(enemy => enemy.draw());
        this.setScore(this.points);
        this.heart.draw();
    }

    setScore(score) {
        this.ctx.save();
        this.ctx.fillText(score, 80, 50);
        this.ctx.restore();
    }

    move() {
        if (this.ada.x >= this.ada.maxX) {
            this.weapons.forEach(weapon => weapon.move());
            this.background.move();
        }
        this.ada.move();
    }
}