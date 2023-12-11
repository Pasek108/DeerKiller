"use strict"

class Game {
  static car_tires_screech = new Audio("Sounds/car_tires_screech.mp3")
  static game_music = new Audio("Sounds/game.mp3")

  constructor() {
    this.html = document.querySelector("html")

    //canvas
    this.width = 864
    this.height = 864
    this.left_edge = 183
    this.right_edge = 681
    this.width_ratio = 0
    this.height_ratio = 0

    //game
    this.is_game_ready = false
    this.is_game_started = false
    this.is_game_over = false
    this.is_slowmo_active = false
    this.slowmo_animation = undefined
    this.is_key_pressed = 0

    this.fps = 60
    this.now
    this.then
    this.elapsed

    this.game_animation = undefined

    this.canvas = document.querySelector(".game-canvas")
    this.ctx = this.canvas.getContext("2d")
    this.ctx.imageSmoothingEnabled = false
    this.ctx.strokeStyle = "blue"
    this.ctx.lineWidth = 2

    Game.car_tires_screech.volume = 0.5
    this.game_music = Game.game_music
    this.game_music.loop = true
    this.game_music.volume = 0
    this.game_music.currentTime = 36.8
   
    this.player = new Player(this)
    this.enemies = []
    this.deers = []
    this.happy_deers = []

    this.bg_road = new RoadBackground()
    this.bg_trees = new TreesBackground()

    this.game_over_screen = new GameOver(this)
    this.health_bar = new HealthBar(this)
    this.energy_bar = new EnergyBar(this)
    this.points_counter = new PointsCounter(".points", this)
    this.counter = document.querySelector(".counter");

    this.resize()
    window.addEventListener("resize", () => this.resize())
    window.addEventListener("keypress", () => this.slowTime())
  }

  initGame(difficulty) {
    this.html.style.pointerEvents = "none"
    this.html.style.cursor = "none"
    this.game_over_screen.reset()
    this.setDifficulty(difficulty)
    this.addEnemies()
    this.addDeers()

    this.ctx.clearRect(this.left_edge - 100, 0, this.width - 2 * this.left_edge + 200, this.height)

    this.fpsInterval = 1000 / this.fps
    this.then = window.performance.now()
    this.startTime = this.then
    this.game_animation = window.requestAnimationFrame(this.draw.bind(this))

    this.bg_road.startAnimation()
    this.bg_trees.startAnimation()

    fadeIn(this.counter)
    if (!Menu.sound_muted) this.game_music.play()
    this.countdown(4)

    this.game_music.volume = 0

    let id = setInterval(() => {
      if (this.game_music.volume > 0.5) {
        this.game_music.volume = 0.5
        clearInterval(id)
      } else this.game_music.volume += 0.01
    }, 60)
  }

  countdown(count) {
    count--
    this.counter.innerText = `${count}`
    if (count < 1) {
      this.is_game_started = true
      this.counter.innerText = ""
      fadeOut(this.counter)
    } else setTimeout(() => this.countdown(count), 900)
  }

  draw(newtime) {
    this.game_animation = window.requestAnimationFrame(this.draw.bind(this))

    this.now = newtime
    this.elapsed = this.now - this.then

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval)

      this.ctx.clearRect(this.left_edge - 50, 0, this.width - this.left_edge + 50, this.height)

      if (this.is_game_started) {
        for (let i = 0; i < 2; i++) {
          this.deers[i].move()
          this.deers[i].draw(this.ctx)

          if (this.deers[i].collistionWithPlayer(this.ctx, this.player)) {
            this.deers[i].deerHit()
            if (!Menu.sound_muted) this.deers[i].sound.play()
            this.points_counter.update(1000)
          }
        }
      }

      this.player.draw(this.ctx)

      if (this.is_game_started) {
        for (let i = 0; i < Enemy.amount; i++) {
          if (this.enemies[i].is_visible) {
            if (this.deers[0].collistionWithEnemy(this.enemies[i])) this.deers[0].deerHit()
            if (this.deers[1].collistionWithEnemy(this.enemies[i])) this.deers[1].deerHit()

            if (this.enemies[i].collistionWithPlayer(this.ctx, this.player)) {
              if (this.health_bar.hp > 0) {
                this.health_bar.reduce()

                if (this.health_bar.hp === 0) {
                  this.player.game_over = true
                  this.player.resetPlayer()
                  this.is_game_over = true
                  clearInterval(this.slowmo_animation)
                  this.is_slowmo_active = false
                  this.gameOverAnimation(i)
                } else {
                  this.player.hitByEnemy()
                  this.enemies[i].destroy()
                }
              }
            }

            this.enemies[i].draw(this.ctx)
          }

          if (this.enemies[i].is_ready) {
            if (this.enemies[i].move(this.ctx)) {
              if (this.is_game_over) continue
              this.newEnemyPosition(i)
            }
          }
        }

        if (!this.is_game_over) this.points_counter.update(1)
        else {
          for (let i = 0; i < this.happy_deers.length; i++) {
            if (this.happy_deers[i].y + this.happy_deers[i].height < this.player.y - 21 || this.happy_deers[i].y > this.player.y + this.player.height + 21) {
              this.happy_deers[i].draw(this.ctx)
            }

            if ((this.player.x < this.width / 2 && i < 10) || (this.player.x > this.width / 2 && i >= 10)) continue
            else this.happy_deers[i].draw(this.ctx)
          }
        }
      }
    }
  }

  slowTime() {
    if (this.is_game_started && !this.is_game_over && !this.is_slowmo_active && this.energy_bar.energy > 0) {
      this.is_slowmo_active = true
      this.bg_road.speed = 4.25
      this.bg_trees.speed = 4.25

      this.slowmo_animation = setInterval(() => {
        if (this.energy_bar.reduce()) {
          clearInterval(this.slowmo_animation)
          this.is_slowmo_active = false
          this.bg_road.speed = 17
          this.bg_trees.speed = 17
        }
      }, 1000)
    }

    this.is_key_pressed = 0
  }

  gameOverAnimation(last_hitted_enemy_id) {
    Game.car_tires_screech.currentTime = 0
    if (!Menu.sound_muted) Game.car_tires_screech.play()
    this.game_music.pause()

    this.enemies[last_hitted_enemy_id].destroy()
    setTimeout(() => (this.enemies[last_hitted_enemy_id].is_visible = false), 900)

    let enemies_skipped = 0
    for (let i = 0; i < Enemy.amount; i++) {
      if (i === last_hitted_enemy_id) continue
      this.enemies[i].crash_sound.volume = 0

      setTimeout(() => {
        if (this.enemies[i].is_ready) this.enemies[i].destroy()
        else {
          enemies_skipped++
          this.enemies[i].is_visible = false
        }
      }, 400 * (i - enemies_skipped + (i < last_hitted_enemy_id)))
    }
  }

  resetGame() {
    this.health_bar.reset()
    this.energy_bar.reset()
    this.points_counter.reset()

    this.is_game_over = false
    this.is_game_ready = false
    this.is_game_started = false
    this.is_slowmo_active = false
    this.slowmo_animation = undefined
    this.is_key_pressed = 0

    this.bg_road.speed = 17
    this.bg_trees.speed = 17

    this.player = new Player(this)
    this.happy_deers = []

    this.game_music.currentTime = 36.8
  }

  addEnemies() {
    this.enemies = []

    for (let i = 0; i < Enemy.amount; i++) {
      this.enemies.push(new Enemy(this))
      this.newEnemyPosition(i)
      this.enemies[i].is_ready = true
    }
  }

  newEnemyPosition(enemy_id) {
    let position_ok = 0
    const enemies_length = this.enemies.length

    while (position_ok < enemies_length - 1) {
      this.enemies[enemy_id].newPosition()

      for (let i = 0; i < enemies_length; i++) {
        if (i == enemy_id) continue

        //check if cars are not in the same column
        if (!isTheSameColumn(this.enemies[enemy_id], this.enemies[i])) {
          position_ok++
          continue
        }

        //if the same column, check if the speed of the bottom car is higher so they will never touch
        if (this.enemies[enemy_id].y > this.enemies[i].y + this.enemies[i].height + 3) {
          if (this.enemies[enemy_id].speed >= this.enemies[i].speed) {
            position_ok++
            continue
          }
        }

        //if not, check if speed of upper car is low enough that they will not touch on screen
        if (this.enemies[enemy_id].y < this.enemies[i].y - this.enemies[i].height - 3) {
          if (this.enemies[enemy_id].speed <= this.enemies[i].speed) {
            position_ok++
            continue
          } else if ((this.enemies[i].y - this.enemies[enemy_id].y) / this.enemies[enemy_id].speed > (this.height - this.enemies[i].y) / (this.enemies[i].speed * 1.5)) {
            position_ok++
            continue
          }
        }

        position_ok = 0
        break
      }
    }

    this.enemies[enemy_id].is_ready = true

    function isTheSameColumn(new_enemy, old_enemy) {
      const from_left = new_enemy.x > old_enemy.x - old_enemy.width - 3
      const from_right = new_enemy.x < old_enemy.x + old_enemy.width + 3
      return from_left && from_right
    }
  }

  addDeers() {
    this.deers = []
    this.deers.push(new Deer("left", this))
    this.deers.push(new Deer("right", this))
  }

  addHappyDeers() {
    this.happy_deers = []

    for (let i = 0; i < 10; i++) this.happy_deers.push(new HappyDeer(this.left_edge - 105, 110 * i + 30, "left", this))
    for (let i = 0; i < 10; i++) this.happy_deers.push(new HappyDeer(this.right_edge + 30, 110 * i + 30, "right", this))
  }

  setDifficulty(level) {
    switch (level) {
      case 0:
        {
          Enemy.amount = 3
          Enemy.min_speed = 4
          Enemy.max_speed = 12
        }
        break
      case 1:
        {
          Enemy.amount = 5
          Enemy.min_speed = 5
          Enemy.max_speed = 15
        }
        break
      case 2:
        {
          Enemy.amount = 7
          Enemy.min_speed = 5
          Enemy.max_speed = 18
        }
        break
      case 3:
        {
          Enemy.amount = 10
          Enemy.min_speed = 5
          Enemy.max_speed = 20
        }
        break
    }
  }

  resize() {
    this.width_ratio = this.width / this.canvas.offsetWidth
    this.height_ratio = this.height / this.canvas.offsetHeight
  }
}
