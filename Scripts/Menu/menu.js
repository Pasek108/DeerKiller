"use strict"

class Menu {
  static menu_music = new Audio("Sounds/menu.mp3")
  static sound_muted = false

  constructor() {
    this.container = document.querySelector(".menu")
    this.black_screen = document.querySelector(".black-screen")

    this.menu_music = Menu.menu_music
    this.menu_music.play()
    this.menu_music.loop = true

    this.remove_menu_anim = this.removeMenuAnimation.bind(this)
    this.remove_anim_timeout = setTimeout(this.remove_menu_anim, 12100)
    window.addEventListener("keypress", this.remove_menu_anim)

    this.sound_button = document.querySelector(".sound-button")
    this.sound_button.addEventListener("click", this.toggleSound.bind(this))

    this.credits = new MenuWindow(".credits", "100vh", this.container)
    this.top_score = new TopScore(".top-score", "100vh", this.container)
    this.difficulty = new Difficulty(".difficulty", "100vw", this.container, this.loadGame.bind(this))
    this.game = new Game()
  }

  removeMenuAnimation() {
    clearTimeout(this.remove_anim_timeout)
    window.removeEventListener("keypress", this.remove_menu_anim)

    const elem_class = [".logo", ".blood", ".title", ".options"]
    for (const elem of elem_class) this.container.querySelector(`${elem}`).classList.remove("anim")

    this.container.classList.remove("anim")

    this.top_score.activateScoreTab(0)
  }

  toggleSound() {
    if (Menu.sound_muted) {
      Menu.sound_muted = false
      this.sound_button.classList.replace("off", "on")
      this.menu_music.play()
    } else {
      Menu.sound_muted = true
      this.sound_button.classList.replace("on", "off")
      this.menu_music.pause()
    }
  }

  loadGame(level) {
    fadeOut(this.container)

    let id = setInterval(() => {
      this.menu_music.volume -= 0.01

      if (this.menu_music.volume < 0.01) {
        this.menu_music.pause()
        this.menu_music.volume = 1

        fadeOut(this.black_screen)
        this.game.initGame(level)

        this.difficulty.unlockOptions()

        clearInterval(id)
      }
    }, 20)
  }
}

const menu = new Menu()