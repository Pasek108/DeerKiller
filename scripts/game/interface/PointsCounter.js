"use strict"

class PointsCounter {
  static points_count = new Audio("Sounds/points_count.wav")

  constructor(container, game_object) {
    this.container = document.querySelector(container)
    this.game_object = game_object
    PointsCounter.points_count.loop = true

    this.digits = this.init()
    this.points = 0
    this.old_points = 0
    this.tick = 0
  }

  init() {
    const digits = []

    for (let i = 0; i < 12; i++) {
      const digit = document.createElement("div")
      digit.innerText = "0"

      this.container.appendChild(digit)
      digits.push(digit)
    }

    return digits
  }

  update(amount) {
    const pts = `${this.points}`
    for (let i = 0; i < pts.length; i++) {
      this.digits[11 - i].innerText = pts[pts.length - 1 - i]
    }

    if (this.game_object.is_slowmo_active && this.tick === 0 && amount === 1) this.points += amount
    else if (!this.game_object.is_slowmo_active) this.points += amount
    this.tick = (this.tick + 1) % 4

    if (this.points - this.old_points > 3000) {
      this.game_object.energy_bar.increase()
      this.old_points += 3000
    }
  }

  copyPoints(points) {
    if (!Menu.sound_muted) PointsCounter.points_count.play()

    const digits = this.digits
    let place = 100000000000
    let points_copy = points - 1
    anim()

    function anim() {
      const number = Math.floor(points_copy / place)
      const digit = place.toString().length - 1

      for (let i = 0; i < number; i++) {
        setTimeout(() => (digits[11 - digit].innerText = i + 1), 50 * i)
      }

      points_copy -= number * place
      place /= 10

      if (place < 1) {
        setTimeout(() => {
          PointsCounter.points_count.pause()
          PointsCounter.points_count.currentTime = 0
        }, 50 * (number + 1))
        return
      }

      setTimeout(anim, 50 * number)
    }
  }

  reset() {
    this.points = 0
    this.old_points = 0
    for (let i = 0; i < 12; i++) this.digits[i].innerText = "0"
  }
}
