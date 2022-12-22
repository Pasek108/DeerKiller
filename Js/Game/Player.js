"use strict";

class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.clear_x = 0;
    this.clear_y = 0;
    this.width = 50;
    this.height = 82;
    this.center_x = this.width / 2;
    this.center_y = this.height / 2;
    this.rotation = 1;

    this.not_moving = false;
    this.hit_by_enemy = false;
    this.protection = false;
    this.protection_end = false;
    this.visibility_timer = 0;
    this.game_over = false;
    this.animation_stop = false;

    this.img = player_img;
    this.hitbox = new Path2D();
    this.hitbox.ellipse(this.x + this.center_x, this.y + this.center_y, this.center_x, this.center_y, 0, 0, Math.PI * 2);

    const road = document.querySelector(".game-canvas");
    this.roadOffsetLeft = road.getBoundingClientRect().left;
    window.addEventListener("mousemove", (e) => this.updatePosition(e));
    window.addEventListener("touchmove", (e) => this.updatePosition(e), {passive: false});
    window.addEventListener("resize", (e) => {
      this.roadOffsetLeft = road.getBoundingClientRect().left;
    });
  }

  draw(ctx) {
    if (this.game_over) {
      this.endGameAnimation(ctx);
      return;
    }

    ctx.globalAlpha = 0;
    ctx.fill(this.hitbox);
    ctx.globalAlpha = 1;

    if (this.protection) ctx.globalAlpha = 0.5 + this.blink();
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.globalAlpha = 1;

    if (this.protection) {
      ctx.beginPath();
      ctx.arc(this.x + this.center_x, this.y + this.center_y, 60, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  updatePosition(e) {
    if (this.game_over) return;
    e.preventDefault();

    let new_x = 0;
    let new_y = 0;

    if(e.type.includes("touch")){
      let touch = e.touches[0] || e.changedTouches[0];
      new_x = touch.pageX;
      new_y = touch.pageY;
  } else {
      new_x = e.pageX;
      new_y = e.pageY;
  }

    this.clear_x = this.x;
    this.clear_y = this.y;

    this.x = (new_x - this.center_x - this.roadOffsetLeft) * game.width_ratio;
    this.y = (new_y - this.center_y) * game.height_ratio;
    this.stopAtEdge();

    if (this.old_page_x === new_x && this.old_page_y === new_y) this.not_moving = true;
    else this.not_moving = false;

    this.old_page_x = new_x;
    this.old_page_y = new_y;

    this.hitbox = new Path2D();
    this.hitbox.ellipse(this.x + this.center_x, this.y + this.center_y, this.center_x, this.center_y, 0, 0, Math.PI * 2);
  }

  stopAtEdge() {
    if (this.x > game.right_edge - this.width) this.x = game.right_edge - this.width;
    else if (this.x < game.left_edge) this.x = game.left_edge;

    if (this.y > game.height - this.height) this.y = game.height - this.height;
    else if (this.y < 0) this.y = 0;
  }

  hitByEnemy() {
    this.hit_by_enemy = true;
    this.protection = true;
    setTimeout((e) => this.resetPlayer(), 3000);
  }

  resetPlayer() {
    this.protection = false;
    this.protection_end = true;
    this.hit_by_enemy = false;
    this.visibility_timer = 0;
    this.old_x = this.x;
    this.old_y = this.y;
  }

  blink() {
    if (this.visibility_timer === 0) {
      setTimeout(() => (this.visibility_timer = 1), 250);
      return 0;
    } else {
      setTimeout(() => (this.visibility_timer = 0), 250);
      return 1;
    }
  }

  endGameAnimation(ctx) {
    if (this.x < 410) this.side = -1;
    else this.side = 1;

    if (!this.animation_stop) {
      this.y -= 2.5;
      this.x += 2.5 * this.side;
    }

    ctx.clearRect(game.left_edge - 100, 0, game.width - 2 * game.left_edge + 200, game.height);
    ctx.translate(this.x + this.center_x, this.y + this.center_y);
    ctx.rotate((this.rotation * this.side * Math.PI) / 180);
    if (!this.animation_stop && this.rotation < 50) this.rotation += 0.5;
    ctx.drawImage(this.img, -this.center_x, -this.center_y, this.width, this.height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    if (!this.animation_stop) {
      const out_from_left = Math.abs(this.old_y - this.y) > (this.old_x - game.left_edge) * Math.sqrt(2) + (280 - this.old_x) / 2 + 15;
      const out_from_right = Math.abs(this.old_y - this.y) > Math.abs(this.old_x - game.right_edge) * Math.sqrt(2) - (578 - this.old_x) / 2 - 30;
      if (out_from_left || out_from_right) {
        this.animation_stop = true;
        car_tires_screech.pause();
        if (!sound_muted) car_hit_tree.play();
        game.bg_road.stopAnimation();
        game.bg_trees.stopAnimation();
        setTimeout(() => game.addHappyDeers(), 100);
      }
    }
  }
}
