"use strict";

class DeerLaugh {
  constructor(x, y, type) {
    this.tick = getRandomInt(-1, 1);
    this.x = x;
    this.y = y + 5 * this.tick;
    this.width = 75;
    this.height = 73;
    this.type = type === "left" ? 1 : -1;
    this.sound = deer_laugh[getRandomInt(0, 9) % 5].cloneNode();
    this.sound_delay = getRandomInt(0, 2000);
    this.sound.volume = 0.5;
    this.sprite = deer_laugh_img[type];
    this.animation = undefined;
    this.step = 0;
    this.old_x = x;
    while (this.step === 0) this.step = getRandomInt(-1, 1);

    this.show();
  }

  draw(ctx) {
    ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }

  show() {
    this.animation = setInterval(() => {
      if (Math.abs(this.x - this.old_x) <= 30) this.x += 3 * this.type;
      else {
        clearInterval(this.animation);
        this.laugh();
        setTimeout(() => {
          if (!sound_muted) this.sound.play();
        }, this.sound_delay);
      }
    }, 50);
  }

  laugh() {
    this.animation = setInterval(() => {
      if (this.tick >= 1) {
        this.tick = 1;
        this.step = -1;
      } else if (this.tick <= -1) {
        this.tick = -1;
        this.step = 1;
      }

      this.tick += this.step;
      this.y += 5 * this.tick;
    }, 50);

    setTimeout(() => this.lowerSound(), 2500);

    setTimeout(() => {
      this.sound.pause();
      clearInterval(this.animation);
      game.game_over_screen.show();
      game.game_animation = window.cancelAnimationFrame(game.game_animation);
    }, 3000);
  }

  lowerSound() {
    this.sound.volume -= 0.1;
    if (this.sound.volume > 0.1) setTimeout(() => this.lowerSound(), 100);
  }
}
