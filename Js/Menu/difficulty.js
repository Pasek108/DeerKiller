"use strict";

const difficulty = new MenuWindow(".difficulty", "100vw");

const difficulty_options = difficulty.container.querySelectorAll(".options .option");
let option_clicked = false;
for (let i = 0; i < difficulty_options.length; i++) {
  difficulty_options[i].addEventListener("click", () => loadGame(i));
}

function loadGame(level) {
  if (!option_clicked) {
    option_clicked = true;
    fadeOut(menu);
    fadeOut(difficulty.container);

    let id = setInterval(() => {
      if (menu_music.volume < 0.01) {
        menu_music.pause();
        menu_music.volume = 1;
        fadeOut(black_screen);
        game.initGame(level);
        option_clicked = false;
        clearInterval(id);
      } else menu_music.volume -= 0.01;
    }, 20);
  }
}
