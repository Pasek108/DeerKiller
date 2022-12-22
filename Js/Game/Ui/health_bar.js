"use strict";

class HealthBar {
  constructor() {
    this.container = document.querySelector(".hp");
    this.hearts = this.init();
    this.hp = 3;
  }

  init() {
    const hearts = [];

    for (let i = 0; i < 3; i++) {
      const heart = document.createElement("div");
      heart.classList.add("heart");

      this.container.appendChild(heart);
      hearts.push(heart);
    }

    return hearts;
  }

  reduce() {
    if (this.hp <= 0) return;

    this.hp -= 1;
    this.hearts[this.hp].style.background = "none";
  }

  reset() {
    this.hp = 3;
    for (let i = 0; i < 3; i++) this.hearts[i].style.background = null;
  }
}
