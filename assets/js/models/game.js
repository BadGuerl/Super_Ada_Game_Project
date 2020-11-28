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
        this.enemies = [];
        this.drawPointsCount = 0;
        this.enemiesFrequency = 100;
        this.weapons = [
            new Weapon(this.ctx, 300, 600)
        ];
        this.score = 0;
        //this.onGameEnd = onGameEnd;
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.addEnemies();
                this.checkCollisions();
                this.checkScore();
            }, this.fps)
        }
    }

    onKeyEvent(event) {
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
        this.background.draw();
        this.ada.draw();
        this.weapons.forEach(weapon => weapon.draw());

        this.pointsWeapon.draw();
        this.ctx.save();
        this.ctx.font = "17px Rockwell";
        this.ctx.fillText(this.points, 30, 25);
        this.ctx.restore();
    }

    move() {
        if (this.ada.x >= this.ada.maxX) {
            this.background.move();
            this.weapons.forEach(weapon => weapon.move());
        } 
        this.ada.move();
        this.enemies.forEach(enemie => enemie.move());
    }

    addEnemies() {
        if (this.enemie.sprite.isReady && (this.drawPointsCount % this.enemiesFrequency === 0)) {
            this.enemies = this.enemies.concat(this.randPairOfEnemies());
            this.drawPointsCount = 0;
        }
    }

    randPairOfEnemies() {
        const space = this.canvas.height - this.enemie.sprite.height;
        const gap = (this.enemies.height * 2) + this.enemies.weapon;
        const topSize = Math.floor(Math.random() * (space - gap) * 0.75);
        const bottomSize = space - topSize - gap;
        return [
            newEnemy(this.ctx, this.canvas.width, this.canvas.height - this.background.height - bottomSize, bottomSize, 'bottom'),

        ]
    }

    checkCollisions() {
        const restOfWeapons = this.weapon.filter(weapon => !this.ada.collidesWidth(weapon));
        const newPoints = this.weapon.length - restOfWeapons.length;
        this.points += newPoints;
        Array(newPoints).fill().forEach(() => {
            this.sounds.weapon.currentTime = 0;
            this.sounds.weapon.play()
        })

        this.weapons = restOfCoins;
    }
    checkScore() {
        const enemy = this.enemies
        .filter(enemy => pipe.mode === 'top')
        .filter(enemy => !enemy.isChecked)
        .find(enemy =>enemy.x + enemy.width < this.ada.x);

        if (enemy) {
            enemy.isChecked = true;
            this.score++;
        }
    }
}