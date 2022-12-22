"use strict";

class Deer {
  static min_speed = 3;
  static max_speed = 15;

  constructor(type) {
    this.type = type;
    this.is_visible = true;
    this.hit_by_car = false;
    this.game_over = false;

    this.sound = deer_death.cloneNode();
    this.newPosition();
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }

  move() {
    if (!this.is_visible) return;

    if (game.is_slowmo_active) {
      if (!this.hit_by_car) this.x += this.speed_x / 4;
      this.y += this.speed_y / 4;
    }
    else {
      if (!this.hit_by_car) this.x += this.speed_x;
      this.y += this.speed_y;
    }
    

    const out_from_bottom = this.y > game.height + 100;
    const out_from_left = this.type === "left" ? 0 : this.x < game.left_edge - 2 * this.width;
    const out_from_right = this.type === "right" ? 0 : this.x > game.right_edge + 2 * this.width;

    if (out_from_bottom || out_from_left || out_from_right) {
      this.is_visible = false;
      setTimeout(() => this.newPosition(), getRandomInt(100, 3000));
    }
  }

  deerHit() {
    this.width = 76;
    this.height = 88;
    this.speed_y = 17;
    this.sprite = blood_img;
    this.hit_by_car = true;
  }

  newPosition() {
    this.x = getRandomInt(this.width, this.width * 4) * (this.type === "left" ? -1 : 1) + (this.type === "left" ? game.left_edge : game.right_edge);
    this.y = getRandomInt(-game.height / 2, game.height / 2);
    this.speed_x = getRandomInt(Deer.min_speed, Deer.max_speed / 2) * (this.type === "left" ? 1 : -1);
    this.speed_y = getRandomInt(Deer.min_speed, Deer.max_speed);

    this.width = 67;
    this.height = 70;
    this.center_x = this.width / 2;
    this.center_y = this.height / 2;
    this.sprite = deer_img[this.type];
    this.hit_by_car = false;
    this.is_visible = true;
  }

  collistionWithEnemy(enemy) {
    if (this.hit_by_car || enemy.is_destroyed) return 0;

    const l_top_deer = [this.x, this.y];
    const r_top_deer = [this.x + this.width, this.y];
    const l_bot_deer = [this.x, this.y + this.height];

    const l_top_enemy = [enemy.x, enemy.y];
    const r_top_enemy = [enemy.x + enemy.width, enemy.y];
    const l_bot_enemy = [enemy.x, enemy.y + enemy.height];

    return (
      (l_top_enemy[0] < l_top_deer[0] && r_top_enemy[0] > l_top_deer[0] && l_top_enemy[1] < l_top_deer[1] && l_bot_enemy[1] > l_top_deer[1]) ||
      (l_top_enemy[0] < l_top_deer[0] && r_top_enemy[0] > l_top_deer[0] && l_top_enemy[1] < l_bot_deer[1] && l_bot_enemy[1] > l_bot_deer[1]) ||
      (r_top_enemy[0] > r_top_deer[0] && l_top_enemy[0] < r_top_deer[0] && l_top_enemy[1] < l_top_deer[1] && l_bot_enemy[1] > l_top_deer[1]) ||
      (r_top_enemy[0] > r_top_deer[0] && l_top_enemy[0] < r_top_deer[0] && l_top_enemy[1] < l_bot_deer[1] && l_bot_enemy[1] > l_bot_deer[1])
    );
  }

  collistionWithPlayer(ctx, player) {
    if (this.hit_by_car || player.hit_by_enemy || player.game_over) return 0;

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
