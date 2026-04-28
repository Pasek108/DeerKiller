"use strict"

class Deer {
  static deer_death = new Audio("sounds/deer_death.wav")
  static blood_img = loadImage("images/game/blood.png")
  static deer_img = {
    left: loadImage("images/game/deer_left.png"),
    right: loadImage("images/game/deer_right.png"),
  }

  static min_speed = 3
  static max_speed = 15

  constructor(type, game_object) {
    this.type = type
    this.game_object = game_object

    this.is_visible = true
    this.hit_by_car = false
    this.game_over = false

    this.sound = Deer.deer_death.cloneNode()
    this.newPosition()
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
  }

  move() {
    if (!this.is_visible) return

    if (this.game_object.is_slowmo_active) {
      if (!this.hit_by_car) this.x += this.speed_x / 4
      this.y += this.speed_y / 4
    } else {
      if (!this.hit_by_car) this.x += this.speed_x
      this.y += this.speed_y
    }

    const out_from_bottom = this.y > this.game_object.height + 100
    const out_from_left = this.type === "left" ? 0 : this.x < this.game_object.left_edge - 2 * this.width
    const out_from_right = this.type === "right" ? 0 : this.x > this.game_object.right_edge + 2 * this.width

    if (out_from_bottom || out_from_left || out_from_right) {
      this.is_visible = false
      setTimeout(() => this.newPosition(), getRandomInt(100, 3000))
    }
  }

  deerHit() {
    this.width = 76
    this.height = 88
    this.speed_y = 17
    this.sprite = Deer.blood_img
    this.hit_by_car = true
  }

  newPosition() {
    this.x = getRandomInt(this.width, this.width * 4)
    this.x *= this.type === "left" ? -1 : 1
    this.x += this.type === "left" ? this.game_object.left_edge : this.game_object.right_edge

    this.y = getRandomInt(-this.game_object.height / 2, this.game_object.height / 2)
    this.speed_x = getRandomInt(Deer.min_speed, Deer.max_speed / 2) * (this.type === "left" ? 1 : -1)
    this.speed_y = getRandomInt(Deer.min_speed, Deer.max_speed)

    this.width = 67
    this.height = 70
    this.center_x = this.width / 2
    this.center_y = this.height / 2
    this.sprite = Deer.deer_img[this.type]
    this.hit_by_car = false
    this.is_visible = true
  }

  collistionWithEnemy(enemy) {
    if (this.hit_by_car || enemy.is_destroyed) return false

    return this.x < enemy.x + enemy.width && this.x + this.width > enemy.x && this.y < enemy.y + enemy.height && this.y + this.height > enemy.y
  }

  collistionWithPlayer(ctx, player) {
    if (this.hit_by_car || player.hit_by_enemy || player.game_over) return false

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
      const term1 = Math.pow(px - h, 2) / Math.pow(a, 2)
      const term2 = Math.pow(py - k, 2) / Math.pow(b, 2)
      if (term1 + term2 <= 1) return true
    }
    return false
  }
}
