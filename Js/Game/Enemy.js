"use strict";

class Enemy {
  static amount = 10;
  static min_speed = 5;
  static max_speed = 20;

  constructor() {
    this.width = 50;
    this.height = 82;
    this.center_x = this.width / 2;
    this.center_y = this.height / 2;
    this.newPosition();

    this.is_visible = true;
    this.is_ready = false;
    this.is_destroyed = false;
    this.explosion_end = false;
    this.game_over = false;

    this.sprite = enemy_img;
    this.crash_sound = car_crash.cloneNode();
    this.explosion_sound = car_explosion.cloneNode();
    this.explosion_sound.volume = 0.3;
    this.explosion_width = 168;
    this.explosion_height = 152;
    this.explosion = new Image();
  }

  draw(ctx) {
    if (this.explosion_frame < 10 || (this.explosion_frame > 13 && !this.is_destroyed)) {
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
  }

  move(ctx) {
    if (!this.is_visible) return;

    if (game.is_slowmo_active) this.y += this.speed / 4;
    else this.y += this.speed;

    if (this.y > game.height + 100) {
      this.is_ready = false;
      return true;
    }

    if (this.explosion_frame < 14) {
      ctx.drawImage(
        this.explosion,
        this.x + 6 * (12 - this.explosion_frame) - 10 * this.explosion_frame - 40,
        this.y + 6 * (12 - this.explosion_frame) - 10 * this.explosion_frame - 40,
        this.explosion_width * (this.explosion_frame / 6),
        this.explosion_height * (this.explosion_frame / 6)
      );
    }

    return false;
  }

  newPosition() {
    this.x = getRandomInt(game.left_edge, game.right_edge - this.width);
    this.y = -getRandomInt(100, 800);
    this.speed = getRandomInt(Enemy.min_speed, Enemy.max_speed);
    this.explosion_frame = 14;
    this.is_destroyed = false;
  }

  destroy() {
    if (!sound_muted) {
      this.crash_sound.play();
      this.explosion_sound.play();
    }

    this.explosion_frame = 0;
    this.explosionAnimation();
  }

  explosionAnimation() {
    if (this.explosion_frame > 13) {
      this.explosion_end = true;
      return 0;
    } else if (this.explosion_frame > 12) this.is_destroyed = true;

    this.explosion = explosion_img[this.explosion_frame].cloneNode();
    this.explosion_frame++;
    setTimeout(() => this.explosionAnimation(), 80);

    return 1;
  }

  collistionWithPlayer(ctx, player) {
    if (player.protection) return 0;

    const l_top = [this.x, this.y];
    const m_top = [this.x + this.center_x, this.y];
    const r_top = [this.x + this.width, this.y];

    const l_mid = [this.x, this.y + this.center_y];
    const r_mid = [this.x + this.width, this.y + this.center_y];

    const l_bot = [this.x, this.y + this.height];
    const m_bot = [this.x + this.center_x, this.y + this.height];
    const r_bot = [this.x + this.width, this.y + this.height];

    return (
      ctx.isPointInPath(player.hitbox, l_top[0], l_top[1]) ||
      ctx.isPointInPath(player.hitbox, m_top[0], m_top[1]) ||
      ctx.isPointInPath(player.hitbox, r_top[0], r_top[1]) ||
      ctx.isPointInPath(player.hitbox, l_mid[0], l_mid[1]) ||
      ctx.isPointInPath(player.hitbox, r_mid[0], r_mid[1]) ||
      ctx.isPointInPath(player.hitbox, l_bot[0], l_bot[1]) ||
      ctx.isPointInPath(player.hitbox, m_bot[0], m_bot[1]) ||
      ctx.isPointInPath(player.hitbox, r_bot[0], r_bot[1])
    );
  }
}
