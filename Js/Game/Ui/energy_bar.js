"use strict";

class EnergyBar {
  constructor() {
    this.container = document.querySelector(".energy");
    this.init();
    this.energy = 0;
  }

  init() {
    for (let i = 0; i < 5; i++) {
      const div = document.createElement("div");
      this.container.appendChild(div);
    }
  }

  increase() {
    if (this.energy >= 5) return;

    this.container.classList.remove(`s${this.energy}`);
    this.energy += 1;
    this.container.classList.add(`s${this.energy}`);
  }

  reduce() {
    if (this.energy <= 0) return true;

    this.container.classList.remove(`s${this.energy}`);
    this.energy -= 1;
    this.container.classList.add(`s${this.energy}`);
  }

  reset() {
    this.container.classList.remove(`s${this.energy}`);
    this.container.classList.add("s0");
    this.energy = 0;
  }
}
