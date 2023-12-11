"use strict"

class HappyDeer {
  static deer_laugh = [
    new Audio("Sounds/deer_laugh1.wav"), 
    new Audio("Sounds/deer_laugh2.wav"), 
    new Audio("Sounds/deer_laugh3.wav"), 
    new Audio("Sounds/deer_laugh4.wav"), 
    new Audio("Sounds/deer_laugh5.wav")
  ]

  static deer_laugh_img = {
    left: loadImage("Images/Game/deer_left_smile.png"),
    right: loadImage("Images/Game/deer_right_smile.png"),
  }

  constructor(x, y, type, game_object) {
    this.type = type === "left" ? 1 : -1
    this.game_object = game_object

    this.tick = getRandomInt(-1, 1)
    this.x = x
    this.old_x = x
    this.y = y + 5 * this.tick

    this.sprite = HappyDeer.deer_laugh_img[type]
    this.width = 75
    this.height = 73

    this.sound = HappyDeer.deer_laugh[getRandomInt(0, 9) % 5].cloneNode()
    this.sound_delay = getRandomInt(0, 2000)
    this.sound.volume = 0.5

    this.animation = undefined
    this.step = 0
    while (this.step === 0) this.step = getRandomInt(-1, 1)

    this.show()
  }

  draw(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height)
  }

  show() {
    this.animation = setInterval(() => {
      if (Math.abs(this.x - this.old_x) <= 30) this.x += 3 * this.type
      else {
        clearInterval(this.animation)
        this.laugh()
        setTimeout(() => {
          if (!Menu.sound_muted) this.sound.play()
        }, this.sound_delay)
      }
    }, 50)
  }

  laugh() {
    this.animation = setInterval(() => {
      if (this.tick >= 1) {
        this.tick = 1
        this.step = -1
      } else if (this.tick <= -1) {
        this.tick = -1
        this.step = 1
      }

      this.tick += this.step
      this.y += 5 * this.tick
    }, 50)

    setTimeout(() => this.lowerSound(), 2500)

    setTimeout(() => {
      this.sound.pause()
      clearInterval(this.animation)
      this.game_object.game_over_screen.show()
      this.game_object.game_animation = window.cancelAnimationFrame(this.game_object.game_animation)
    }, 3000)
  }

  lowerSound() {
    this.sound.volume -= 0.1
    if (this.sound.volume > 0.1) setTimeout(() => this.lowerSound(), 100)
  }
}
