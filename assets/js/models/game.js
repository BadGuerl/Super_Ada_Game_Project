class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1366;
        this.canvas.height = 768;
        this.ctx = this.canvas.getContext('2d');

        this.fps = 1000 / 60;
        this.drawIntervalId = undefined;

        this.intro = new Intro(this.ctx);
        this.background = new Background(this.ctx);
        this.ada = new Ada(this.ctx, 15, 550);
        this.enemy = new Enemy(this.ctx, this.canvas.width, 550);

        this.weapons = [
            new Weapon(this.ctx, this.enemy.x, this.enemy.y + 50)
        ];

        this.pointsWeapon = new Weapon(this.ctx, 10, 10)
        this.points = 0;
    }


    start() {
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
        this.intro.onKeyEvent(event);
        this.ada.onKeyEvent(event);
        this.background.onKeyEvent(event);
        this.weapons.forEach(weapon => weapon.onKeyEvent(event))
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
        this.intro.draw();
        this.background.draw();
        this.ada.draw();
        this.weapons.forEach(weapon => weapon.draw());
        this.enemy.draw();
        this.ctx.save();
        this.ctx.font = "2.5em Rockwell";
        this.ctx.fillStyle = "#FFFFFF";
        this.ctx.fillText(this.weapons.length, 80, 50);
        this.ctx.restore();
        this.counterImg.draw();
    }

    move() {
        if (this.ada.x >= this.ada.maxX) {
            this.weapons.forEach(weapon => weapon.move());
            this.background.move();
        }
        this.ada.move();
    }

    checkCollisions() {
        const restOfWeapons = this.weapons.filter(weapon => !this.ada.collidesWidth(weapon));
        const newPoints = this.weapons.length - restOfWeapons.length;
        this.points += newPoints;
        Array(newPoints).fill().forEach(() => {
            this.sounds.weapon.currentTime = 0;
            this.sounds.weapon.play();
        })

        this.weapons = restOfWeapons;
    }
}