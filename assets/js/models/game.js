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
        // this.enemies = [
        //     new Enemy(this.ctx, this.canvas.width -50, 550, 'enemy1')
        //     // new Enemy(this.ctx, this.canvas.width + 1000, 500, 'enemy2'),
        //     // new Enemy(this.ctx, this.canvas.width + 2000, 600, 'enemy3'),
        //     // new Enemy(this.ctx, this.canvas.width + 3500, 480, 'enemy4'),
        //     // new Enemy(this.ctx, this.canvas.width + 4500, 520, 'enemy5'),
        //     // new Enemy(this.ctx, this.canvas.width + 6000, 500, 'enemy6'),
        //     // new Enemy(this.ctx, this.canvas.width + 7500, 550, 'enemy7')
        // ];
        this.enemies = [];
        this.weapons = [];
        this.maxY = this.canvas.height - 140;
        this.minY = Math.floor(this.canvas.height / 1.7);
       
        this.shield = new Shield(this.ctx, 1250, 15);
        this.heart = new Heart(this.ctx, 25, 15);
        this.points = 3;
        this.defendPoints = 0;
        // this.weapons = this.enemies.map(enemy => enemy.weapon);
    }


    start() {
        this.intro.style.display = "none";
        this.canvas.style.display = "block";
        if (!this.drawIntervalId) {
            setInterval(() => {
                let enemyId = Math.floor(Math.random() * 10) + 1;
                // let enemyY = Math.floor(Math.random() * this.maxY) + this.minY;
                let enemyY =Math.floor(Math.random() * (this.maxY - this.minY + 1)) + this.minY;
                // enemyY = (enemyY > this.maxY)? this.maxY : enemyY;
                // console.log(enemyY," ", this.maxY);
                this.enemies.push(new Enemy(this.ctx, this.canvas.width -50, enemyY, 'enemy' + enemyId));
            }, 3000);
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.checkCollisions();
            }, this.fps);
            
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
        // this.weapons.forEach(weapon => weapon.draw());
        this.enemies.map(enemy => enemy.draw());
        this.setScore(this.points);
        this.setScoreDefend(this.defendPoints);
        this.heart.draw();
        this.shield.draw();
    }

    setScore(score) {
        this.ctx.save();
        this.ctx.fillText(score, 80, 50);
        this.ctx.restore();
    }

    setScoreDefend(score) {
        this.ctx.save();
        this.ctx.fillText(score, 1300, 50);
        this.ctx.restore();
    }

    move() {
        if (this.ada.x >= this.ada.maxX) {
            // this.weapons.forEach(weapon => weapon.move());
            this.background.move();
        }
        this.ada.move();
    }

    checkCollisions() {
        const restOfWeapons = this.weapons.filter(weapon => !this.ada.collidesWidth(weapon));
        const newPoints = this.weapons.length - restOfWeapons.length;
        this.points -= newPoints;
        this.defendPoints += newPoints;
        /* Array(newPoints).fill().forEach(() => {
             this.sounds.weapon.currentTime = 0;
             this.sounds.weapon.play();
         })*/

        this.weapons = restOfWeapons;
    }
}