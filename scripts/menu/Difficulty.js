"use strict"

class Difficulty extends MenuWindow {
  constructor(class_name, position, menu_container, load_game_callback) {
    super(class_name, position, menu_container, menu_container)
    this.load_game_callback = load_game_callback

    this.option_clicked = false
    this.options = this.container.querySelectorAll(".options .option")
    this.options.forEach((option, index) => option.addEventListener("click", () => this.loadGame(index)))
  }

  lockOptions() {
    this.option_clicked = true
  }

  unlockOptions() {
    this.option_clicked = false
  }

  loadGame(level) {
    if (this.option_clicked) return

    this.lockOptions()

    fadeOut(this.container)

    this.load_game_callback(level)
  }
}
