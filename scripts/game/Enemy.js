"use strict"

class Enemy {
  static car_explosion = new Audio("sounds/car_explosion.mp3")
  static car_crash = new Audio("sounds/car_crash.mp3")
  static enemy_img = loadImage("images/game/enemy.png")
  static explosion_img = [...Array(14).keys()].map(n => loadImage(`images/game/explosion/${n}.png`))

  static amount = 10
  static min_speed = 5
  static max_speed = 20

  constructor(game_object) {
    this.game_object = game_object

    this.width = 50
    this.height = 82
    this.center_x = this.width / 2
    this.center_y = this.height / 2
    this.newPosition()

    this.is_visible = true
    this.is_ready = false
    this.is_destroyed = false
    this.explosion_end = false
    this.game_over = false

    this.sprite = Enemy.enemy_img
    this.crash_sound = Enemy.car_crash.cloneNode()
    this.explosion_sound = Enemy.car_explosion.cloneNode()
    this.explosion_sound.volume = 0.3
    this.explosion_width = 168
    this.explosion_height = 152
  }

  draw(ctx) {
    if (this.explosion_frame < 10 || (this.explosion_frame > 13 && !this.is_destroyed)) {
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
    }
  }

  move(ctx) {
    if (!this.is_visible) return

    if (this.game_object.is_slowmo_active) this.y += this.speed / 4
    else this.y += this.speed

    if (this.y > this.game_object.height + 100) {
      this.is_ready = false
      return true
    }

    if (this.explosion_frame < 14) {
      ctx.drawImage(Enemy.explosion_img[this.explosion_frame], this.x + 6 * (12 - this.explosion_frame) - 10 * this.explosion_frame - 40, this.y + 6 * (12 - this.explosion_frame) - 10 * this.explosion_frame - 40, this.explosion_width * (this.explosion_frame / 6), this.explosion_height * (this.explosion_frame / 6))
    }

    return false
  }

  newPosition() {
    this.x = getRandomInt(this.game_object.left_edge, this.game_object.right_edge - this.width)
    this.y = -getRandomInt(100, 800)
    this.speed = getRandomInt(Enemy.min_speed, Enemy.max_speed)
    this.explosion_frame = 14
    this.is_destroyed = false
  }

  destroy() {
    if (!Menu.sound_muted) {
      this.crash_sound.play()
      this.explosion_sound.play()
    }

    this.explosion_frame = 0
    this.explosionAnimation()
  }

  explosionAnimation() {
    if (this.explosion_frame > 13) {
      this.explosion_end = true
      return 0
    }
    if (this.explosion_frame > 12) this.is_destroyed = true

    this.explosion_frame++
    setTimeout(() => this.explosionAnimation(), 80)

    return 1
  }

  collistionWithPlayer(ctx, player) {
    if (player.protection) return false

    const h = player.x + player.center_x
    const k = player.y + player.center_y

    const a = player.center_x
    const b = player.center_y

    const points = [
      [this.x, this.y],
      [this.x + this.center_x, this.y],
      [this.x + this.width, this.y],
      [this.x, this.y + this.center_y],
      [this.x + this.width, this.y + this.center_y],
      [this.x, this.y + this.height],
      [this.x + this.center_x, this.y + this.height],
      [this.x + this.width, this.y + this.height],
    ]

    for (let [px, py] of points) {
      // Ellipse: (x-h)^2 / a^2 + (y-k)^2 / b^2
      const term1 = Math.pow(px - h, 2) / Math.pow(a, 2)
      const term2 = Math.pow(py - k, 2) / Math.pow(b, 2)

      if (term1 + term2 <= 1) return true
    }

    return false
  }
}
