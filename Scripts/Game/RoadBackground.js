"use strict"

class RoadBackground {
  constructor() {
    this.canvas = document.querySelector(".road-canvas")
    this.ctx = this.canvas.getContext("2d")
    this.ctx.imageSmoothingEnabled = false
    this.ctx.fillStyle = "white"

    this.width = 10
    this.height = 864
    this.lines_height = 69
    this.lines_space = 69
    this.speed = 17

    this.fps = 60
    this.now
    this.then
    this.elapsed

    this.animation = undefined

    this.lines_y = []
    for (let i = 0; i < 7; i++) {
      this.lines_y.push(this.lines_height * i + this.lines_space * i)
    }

    this.offset = this.height - this.lines_y[6]
  }

  draw(newtime) {
    this.animation = window.requestAnimationFrame(this.draw.bind(this))

    this.now = newtime
    this.elapsed = this.now - this.then

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval)

      this.ctx.clearRect(0, 0, this.width, this.height)

      for (let i = 0; i < 7; i++) {
        this.ctx.fillRect(0, this.lines_y[i], this.width, this.lines_height)
        this.lines_y[i] += this.speed

        if (this.lines_y[i] > this.height) {
          this.lines_y[i] = -this.lines_space - this.offset + (this.lines_y[i] - this.height)
        }
      }
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
  }
}
