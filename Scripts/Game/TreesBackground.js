"use strict"

class TreesBackground {
  constructor() {
    this.canvas = document.querySelectorAll(".trees-canvas")

    this.width = 864
    this.height = 864
    this.speed = 17
    this.y = 0

    this.fps = 60
    this.now
    this.then
    this.elapsed

    this.img = loadImage("Images/Game/forest_bg.png")
    this.animation = undefined

    this.ctx_l = this.canvas[0].getContext("2d")
    this.ctx_l.imageSmoothingEnabled = false

    this.ctx_p = this.canvas[1].getContext("2d")
    this.ctx_p.imageSmoothingEnabled = false
  }

  draw(newtime) {
    this.animation = window.requestAnimationFrame(this.draw.bind(this))

    this.now = newtime
    this.elapsed = this.now - this.then

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval)

      this.ctx_l.clearRect(19, 0, 30, this.height)
      this.ctx_p.clearRect(19, 0, 30, this.height)

      this.ctx_l.drawImage(this.img, 19, this.y, this.width, this.height)
      this.ctx_p.drawImage(this.img, 19, this.y, this.width, this.height)

      this.ctx_l.drawImage(this.img, 19, this.y - this.height, this.width, this.height)
      this.ctx_p.drawImage(this.img, 19, this.y - this.height, this.width, this.height)

      this.y += this.speed
      if (this.y > this.height) this.y = this.y - this.height
    }
  }

  startAnimation() {
    this.fpsInterval = 1000 / this.fps
    this.then = window.performance.now()
    this.startTime = this.then
    this.animation = window.requestAnimationFrame(this.draw.bind(this))
  }

  stopAnimation() {
    this.animation = window.cancelAnimationFrame(this.animation)

    this.ctx_l.clearRect(19, 0, 30, this.height)
    this.ctx_p.clearRect(19, 0, 30, this.height)

    this.ctx_l.drawImage(this.img, 19, 0, this.width, this.height)
    this.ctx_p.drawImage(this.img, 19, 0, this.width, this.height)
  }
}
