"use strict"

menu_music.play()
menu_music.loop = true
const menu = document.querySelector(".menu")
let remove_menu_anim = setTimeout(removeMenuAnimation, 12100)
window.addEventListener("keypress", removeMenuAnimation)

function removeMenuAnimation() {
  clearTimeout(remove_menu_anim)
  window.removeEventListener("keypress", removeMenuAnimation)

  const elem_class = [".logo", ".blood", ".title", ".options"]

  menu.classList.remove("anim")
  for (const elem of elem_class) {
    menu.querySelector(`${elem}`).classList.remove("anim")
  }

  activateScoreTab(0)
}

const sound_button = document.querySelector(".sound-button")
let sound_muted = false
sound_button.addEventListener("click", () => {
  if (sound_muted) {
    sound_muted = false
    sound_button.classList.replace("off", "on")
    menu_music.play()
  } else {
    sound_muted = true
    sound_button.classList.replace("on", "off")
    menu_music.pause()
  }
})

class MenuWindow {
  constructor(class_name, position) {
    this.container = document.querySelector(class_name)
    this.trigger_button = document.querySelector(`.menu .options ${class_name}-button`)
    this.back_button = document.querySelector(`${class_name} .back`)

    this.pos_value = parseInt(position.slice(0, -2))
    this.pos_unit = position.slice(-2)
    this.axis = this.pos_unit === "vw" ? "X" : "Y"

    this.trigger_button.addEventListener("click", () => this.show())
    this.back_button.addEventListener("click", () => this.hide())
  }

  show() {
    this.container.style.transform = `translate${this.axis}(${-this.pos_value}${this.pos_unit})`
    menu.style.transform = `translate${this.axis}(${-this.pos_value}${this.pos_unit})`
  }

  hide() {
    this.container.style.transform = `translate${this.axis}(0${this.pos_unit})`
    menu.style.transform = `translate${this.axis}(0${this.pos_unit})`
  }
}
