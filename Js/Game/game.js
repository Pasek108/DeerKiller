"use strict";

class BackgroundRoad {
  width = 10;
  height = 864;
  lines_height = 69;
  lines_space = 69;
  speed = 17;

  fps = 60;
  now;
  then;
  elapsed;

  animation = undefined;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.fillStyle = "white";

    this.lines_y = [];
    for (let i = 0; i < 7; i++) {
      this.lines_y.push(this.lines_height * i + this.lines_space * i);
    }

    this.offset = this.height - this.lines_y[6];
  }

  draw(newtime) {
    this.animation = window.requestAnimationFrame(this.draw.bind(this));

    this.now = newtime;
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);

      this.ctx.clearRect(0, 0, this.width, this.height);

      for (let i = 0; i < 7; i++) {
        this.ctx.fillRect(0, this.lines_y[i], this.width, this.lines_height);
        this.lines_y[i] += this.speed;

        if (this.lines_y[i] > this.height) {
          this.lines_y[i] = -this.lines_space - this.offset + (this.lines_y[i] - this.height);
        }
      }
    }
  }

  startAnimation() {
    this.fpsInterval = 1000 / this.fps;
    this.then = window.performance.now();
    this.startTime = this.then;
    this.animation = window.requestAnimationFrame(this.draw.bind(this));
  }

  stopAnimation() {
    this.animation = window.cancelAnimationFrame(this.animation);
  }
}

class BackgroundTrees {
  width = 864;
  height = 864;
  speed = 17;
  y = 0;

  fps = 60;
  now;
  then;
  elapsed;

  img = createImage("Images/Game/forest_bg.png");
  animation = undefined;

  constructor(canvas) {
    this.ctx_l = canvas[0].getContext("2d");
    this.ctx_l.imageSmoothingEnabled = false;

    this.ctx_p = canvas[1].getContext("2d");
    this.ctx_p.imageSmoothingEnabled = false;
  }

  draw(newtime) {
    this.animation = window.requestAnimationFrame(this.draw.bind(this));

    this.now = newtime;
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);

      this.ctx_l.clearRect(19, 0, 30, this.height);
      this.ctx_p.clearRect(19, 0, 30, this.height);

      this.ctx_l.drawImage(this.img, 19, this.y, this.width, this.height);
      this.ctx_p.drawImage(this.img, 19, this.y, this.width, this.height);

      this.ctx_l.drawImage(this.img, 19, this.y - this.height, this.width, this.height);
      this.ctx_p.drawImage(this.img, 19, this.y - this.height, this.width, this.height);

      this.y += this.speed;
      if (this.y > this.height) this.y = this.y - this.height;
    }
  }

  startAnimation() {
    this.fpsInterval = 1000 / this.fps;
    this.then = window.performance.now();
    this.startTime = this.then;
    this.animation = window.requestAnimationFrame(this.draw.bind(this));
  }

  stopAnimation() {
    this.animation = window.cancelAnimationFrame(this.animation);

    this.ctx_l.clearRect(19, 0, 30, this.height);
    this.ctx_p.clearRect(19, 0, 30, this.height);

    this.ctx_l.drawImage(this.img, 19, 0, this.width, this.height);
    this.ctx_p.drawImage(this.img, 19, 0, this.width, this.height);
  }
}

class Game {
  //canvas
  width = 864;
  height = 864;
  left_edge = 183;
  right_edge = 681;
  width_ratio = 0;
  height_ratio = 0;

  //game
  is_game_ready = false;
  is_game_started = false;
  is_game_over = false;
  is_slowmo_active = false;
  slowmo_animation = undefined;
  is_key_pressed = 0;

  fps = 60;
  now;
  then;
  elapsed;

  //interface
  game_over_screen = new GameOver();
  health_bar = new HealthBar();
  energy_bar = new EnergyBar();
  points_counter = new PointsCounter(".points");

  game_animation = undefined;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.strokeStyle = "blue";
    this.ctx.lineWidth = 2;

    this.player = new Player();
    this.enemies = [];
    this.deers = [];
    this.happy_deers = [];

    this.bg_road = new BackgroundRoad(document.querySelector(".road-canvas"));
    this.bg_trees = new BackgroundTrees(document.querySelectorAll(".trees-canvas"));

    this.resize(canvas);
    window.addEventListener("resize", () => this.resize(canvas));
    window.addEventListener("keypress", () => this.slowTime());
  }

  initGame(difficulty) {
    html.style.pointerEvents = "none";
    html.style.cursor = "none";
    this.game_over_screen.reset();
    this.setDifficulty(difficulty);
    this.addEnemies();
    this.addDeers();

    this.ctx.clearRect(this.left_edge - 100, 0, this.width - 2 * this.left_edge + 200, this.height);

    this.fpsInterval = 1000 / this.fps;
    this.then = window.performance.now();
    this.startTime = this.then;
    this.game_animation = window.requestAnimationFrame(this.draw.bind(this));

    this.bg_road.startAnimation();
    this.bg_trees.startAnimation();

    fadeIn(counter);
    if (!sound_muted) game_music.play();
    this.countdown(4);

    game_music.volume = 0;

    let id = setInterval(() => {
      if (game_music.volume > 0.5) {
        game_music.volume = 0.5;
        clearInterval(id);
      } else game_music.volume += 0.01;
    }, 60);
  }

  countdown(count) {
    count--;
    counter.innerText = `${count}`;
    if (count < 1) {
      this.is_game_started = true;
      counter.innerText = "";
      fadeOut(counter);
    } else setTimeout(() => this.countdown(count), 900);
  }

  draw(newtime) {
    this.game_animation = window.requestAnimationFrame(this.draw.bind(this));

    this.now = newtime;
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);

      this.ctx.clearRect(this.left_edge - 50, 0, this.width - this.left_edge + 50, this.height);

      if (this.is_game_started) {
        for (let i = 0; i < 2; i++) {
          this.deers[i].move();
          this.deers[i].draw(this.ctx);

          if (this.deers[i].collistionWithPlayer(this.ctx, this.player)) {
            this.deers[i].deerHit();
            if (!sound_muted) this.deers[i].sound.play();
            this.points_counter.update(1000);
          }
        }
      }

      this.player.draw(this.ctx);

      if (this.is_game_started) {
        for (let i = 0; i < Enemy.amount; i++) {
          if (this.enemies[i].is_visible) {
            if (this.deers[0].collistionWithEnemy(this.enemies[i])) this.deers[0].deerHit();
            if (this.deers[1].collistionWithEnemy(this.enemies[i])) this.deers[1].deerHit();

            if (this.enemies[i].collistionWithPlayer(this.ctx, this.player)) {
              if (this.health_bar.hp > 0) {
                this.health_bar.reduce();

                if (this.health_bar.hp === 0) {
                  this.player.game_over = true;
                  this.player.resetPlayer();
                  this.is_game_over = true;
                  clearInterval(this.slowmo_animation);
                  this.is_slowmo_active = false;
                  this.gameOverAnimation(i);
                } else {
                  this.player.hitByEnemy();
                  this.enemies[i].destroy();
                }
              }
            }

            this.enemies[i].draw(this.ctx);
          }

          if (this.enemies[i].is_ready) {
            if (this.enemies[i].move(this.ctx)) {
              if (this.is_game_over) continue;
              this.newEnemyPosition(i);
            }
          }
        }

        if (!this.is_game_over) this.points_counter.update(1);
        else {
          for (let i = 0; i < this.happy_deers.length; i++) {
            if (this.happy_deers[i].y + this.happy_deers[i].height < this.player.y - 21 || this.happy_deers[i].y > this.player.y + this.player.height + 21) {
              this.happy_deers[i].draw(this.ctx);
            }

            if ((this.player.x < this.width / 2 && i < 10) || (this.player.x > this.width / 2 && i >= 10)) continue;
            else this.happy_deers[i].draw(this.ctx);
          }
        }
      }
    }
  }

  slowTime() {
    if (this.is_game_started && !this.is_game_over && !this.is_slowmo_active && this.energy_bar.energy > 0) {
      this.is_slowmo_active = true;
      this.bg_road.speed = 4.25;
      this.bg_trees.speed = 4.25;

      this.slowmo_animation = setInterval(() => {
        if (this.energy_bar.reduce()) {
          clearInterval(this.slowmo_animation);
          this.is_slowmo_active = false;
          this.bg_road.speed = 17;
          this.bg_trees.speed = 17;
        }
      }, 1000);
    }

    this.is_key_pressed = 0;
  }

  gameOverAnimation(last_hitted_enemy_id) {
    car_tires_screech.currentTime = 0;
    if (!sound_muted) car_tires_screech.play();
    game_music.pause();

    this.enemies[last_hitted_enemy_id].destroy();
    setTimeout(() => (this.enemies[last_hitted_enemy_id].is_visible = false), 900);

    let enemies_skipped = 0;
    for (let i = 0; i < Enemy.amount; i++) {
      if (i === last_hitted_enemy_id) continue;
      this.enemies[i].crash_sound.volume = 0;

      setTimeout(() => {
        if (this.enemies[i].is_ready) this.enemies[i].destroy();
        else {
          enemies_skipped++;
          this.enemies[i].is_visible = false;
        }
      }, 400 * (i - enemies_skipped + (i < last_hitted_enemy_id)));
    }
  }

  resetGame() {
    this.health_bar.reset();
    this.energy_bar.reset();
    this.points_counter.reset();

    this.is_game_over = false;
    this.is_game_ready = false;
    this.is_game_started = false;
    this.is_slowmo_active = false;
    this.slowmo_animation = undefined;
    this.is_key_pressed = 0;

    this.bg_road.speed = 17;
    this.bg_trees.speed = 17;

    this.player = new Player();
    this.happy_deers = [];

    game_music.currentTime = 36.8;
  }

  addEnemies() {
    this.enemies = [];

    for (let i = 0; i < Enemy.amount; i++) {
      this.enemies.push(new Enemy());
      this.newEnemyPosition(i);
      this.enemies[i].is_ready = true;
    }
  }

  newEnemyPosition(enemy_id) {
    let position_ok = 0;
    const enemies_length = this.enemies.length;

    while (position_ok < enemies_length - 1) {
      this.enemies[enemy_id].newPosition();

      for (let i = 0; i < enemies_length; i++) {
        if (i == enemy_id) continue;

        //check if cars are not in the same column
        if (!isTheSameColumn(this.enemies[enemy_id], this.enemies[i])) {
          position_ok++;
          continue;
        }

        //if the same column, check if the speed of the bottom car is higher so they will never touch
        if (this.enemies[enemy_id].y > this.enemies[i].y + this.enemies[i].height + 3) {
          if (this.enemies[enemy_id].speed >= this.enemies[i].speed) {
            position_ok++;
            continue;
          }
        }

        //if not, check if speed of upper car is low enough that they will not touch on screen
        if (this.enemies[enemy_id].y < this.enemies[i].y - this.enemies[i].height - 3) {
          if (this.enemies[enemy_id].speed <= this.enemies[i].speed) {
            position_ok++;
            continue;
          } else if ((this.enemies[i].y - this.enemies[enemy_id].y) / this.enemies[enemy_id].speed > (this.height - this.enemies[i].y) / (this.enemies[i].speed * 1.5)) {
            position_ok++;
            continue;
          }
        }

        position_ok = 0;
        break;
      }
    }

    this.enemies[enemy_id].is_ready = true;

    function isTheSameColumn(new_enemy, old_enemy) {
      const from_left = new_enemy.x > old_enemy.x - old_enemy.width - 3;
      const from_right = new_enemy.x < old_enemy.x + old_enemy.width + 3;
      return from_left && from_right;
    }
  }

  addDeers() {
    this.deers = [];
    this.deers.push(new Deer("left"));
    this.deers.push(new Deer("right"));
  }

  addHappyDeers() {
    this.happy_deers = [];

    for (let i = 0; i < 10; i++) this.happy_deers.push(new DeerLaugh(this.left_edge - 105, 110 * i + 30, "left"));
    for (let i = 0; i < 10; i++) this.happy_deers.push(new DeerLaugh(this.right_edge + 30, 110 * i + 30, "right"));
  }

  setDifficulty(level) {
    switch (level) {
      case 0:
        {
          Enemy.amount = 3;
          Enemy.min_speed = 4;
          Enemy.max_speed = 12;
        }
        break;
      case 1:
        {
          Enemy.amount = 5;
          Enemy.min_speed = 5;
          Enemy.max_speed = 15;
        }
        break;
      case 2:
        {
          Enemy.amount = 7;
          Enemy.min_speed = 5;
          Enemy.max_speed = 18;
        }
        break;
      case 3:
        {
          Enemy.amount = 10;
          Enemy.min_speed = 5;
          Enemy.max_speed = 20;
        }
        break;
    }
  }

  resize(canvas) {
    this.width_ratio = this.width / canvas.offsetWidth;
    this.height_ratio = this.height / canvas.offsetHeight;
  }
}

const game = new Game(document.querySelector(".game-canvas"));

points_count.loop = true;
game_music.loop = true;
game_music.volume = 0;
game_music.currentTime = 36.8;
car_tires_screech.volume = 0.5;
car_hit_tree.volume = 0.5;
