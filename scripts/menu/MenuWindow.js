"use strict"

class MenuWindow {
  constructor(class_name, position, menu_container) {
    this.container = document.querySelector(class_name)
    this.menu = menu_container

    this.pos_value = parseInt(position.slice(0, -2))
    this.pos_unit = position.slice(-2)
    this.axis = this.pos_unit === "vw" ? "X" : "Y"

    this.trigger_button = document.querySelector(`.menu .options ${class_name}-button`)
    this.trigger_button.addEventListener("click", () => this.show())

    this.back_button = document.querySelector(`${class_name} .back`)
    this.back_button.addEventListener("click", () => this.hide())
  }

  show() {
    this.container.style.transform = `translate${this.axis}(${-this.pos_value}${this.pos_unit})`
    this.menu.style.transform = `translate${this.axis}(${-this.pos_value}${this.pos_unit})`
  }

  hide() {
    this.container.style.transform = `translate${this.axis}(0${this.pos_unit})`
    this.menu.style.transform = `translate${this.axis}(0${this.pos_unit})`
  }
}
