"use strict";

class GameOver {
  constructor() {
    this.container = document.querySelector(".game-over");
    this.save_button = this.container.querySelector(".save-score");
    this.back_button = this.container.querySelector(".back-to-menu");
    this.text = this.container.querySelector(".text");

    this.save_button_state = 0;

    this.save_button.addEventListener("click", () => this.saveButtonClick());
    this.back_button.addEventListener("click", () => this.backButtonClick());
  }

  show() {
    html.style.pointerEvents = "all";
    html.style.cursor = "default";

    this.container.style.visibility = "visible";
    this.container.style.transform = "translateY(100vh)";

    difficulty.hide();
  }

  saveButtonClick() {
    if (this.save_button_state === 0) {
      this.save_button.style.textDecoration = "underline";
      this.save_button.innerText = "Send score";
      this.save_button_state = 1;

      this.text.style.marginLeft = "0px";
      this.text.innerHTML = "";

      this.createSendScoreForm();
      let pts_counter = new PointsCounter(".pts");
      pts_counter.copyPoints(game.points_counter.points);
    } else if (this.save_button_state === 1) {
      if (this.checkNickname() && this.checkPoints()) {
        const name = this.text.querySelector("input").value;
        this.sendScore(name, game.points_counter.points);
      }
    } else this.backButtonClick();
  }

  createSendScoreForm() {
    const nickname_input = document.createElement("input");
    nickname_input.placeholder = "nickname";
    nickname_input.maxLength = "26";
    nickname_input.minLength = "1";

    const pts = document.createElement("div");
    pts.classList.add("pts");
    pts.classList.add("flex-center-row");

    this.text.appendChild(nickname_input);
    this.text.appendChild(pts);
  }

  checkNickname() {
    const nickname_input = this.text.querySelector("input");
    const nick = nickname_input.value;

    if (nick.length < 1 || nick.length > 26) {
      nickname_input.style.border = "2px solid red";
      return false;
    }

    nickname_input.style.border = "1px solid black";
    return true;
  }

  checkPoints() {
    return true;
  }

  sendScore(name, points) {
    let level = "easy";
    switch (Enemy.amount) {
      case 3: level = "easy"; break;
      case 5: level = "medium"; break;
      case 7: level = "hard"; break;
      case 10: level = "hardcore"; break;
    }

    const records = localStorage.getItem(level);
    const data = records.split(";");
    if (data.length < 10 && data[0] !== "") data.push("");

    for (let i = 0; i < data.length; i++) {
      if (i >= 10) break;
      const string_record = data[i].split(":");
      let score = parseInt(string_record[2]);

      if (data[i] === "") {
        data[i] = `${i}:${name}:${points}`;
        break;
      }

      if (points >= score) {
        for (let j = data.length - 1; j > i; j--) {
          const record = data[j - 1].split(":");
          data[j] = `${j - 1}:${record[1]}:${record[2]}`;
        }

        data[i] = `${i}:${name}:${points}`;
        break;
      }
    }

    localStorage.setItem(level, data.join(";"));

    const url = new URL(address + "send_scores.php");
    url.searchParams.set("level", level);
    url.searchParams.set("name", name);
    url.searchParams.set("score", points);
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();

    /*request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        console.log(request.responseText);
      }
    };*/

    this.text.innerHTML = "Score Saved";
    this.save_button.style.textDecoration = null;
    this.save_button.innerText = "Back to menu";
    this.save_button_state = 2;
  }

  backButtonClick() {
    if (!sound_muted) menu_music.play();
    menu_music.volume = 0;
    game.resetGame();
    activateScoreTab(0);
    fadeIn(black_screen);
    let id = setInterval(() => {
      if (menu_music.volume > 0.98) {
        menu_music.volume = 1;
        this.reset();
        fadeIn(menu);
        fadeIn(difficulty.container);
        clearInterval(id);
      } else menu_music.volume += 0.01;
    }, 20);
  }

  reset() {
    this.container.style.visibility = "hidden";
    this.container.style.transform = "translateY(0vh)";

    this.save_button.style.textDecoration = null;
    this.save_button.innerText = "Save score";
    this.save_button_state = 0;

    this.text.style.marginLeft = null;
    this.text.innerHTML = "Game over";
  }
}
