"use strict";

const top_score = new MenuWindow(".top-score", "100vh");

const top_score_options = top_score.container.querySelectorAll(".level-tabs .tab");
const personal = document.querySelector(".personal");
const top_10 = document.querySelector(".top10");

let scores = {};
scores = getScores();

for (let i = 0; i < top_score_options.length; i++) {
  top_score_options[i].addEventListener("click", () => activateScoreTab(i));
}

function getScores() {
  const url = new URL(address + "get_scores.php");

  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();

  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      const data = JSON.parse(request.responseText);
      scores = data;
    }
  };

  return scores;
}

function activateScoreTab(tab_nr) {
  for (let i = 0; i < top_score_options.length; i++) {
    top_score_options[i].classList.remove("active");
  }

  top_score_options[tab_nr].classList.add("active");
  scores = getScores();
  fillPersonalTable(tab_nr);
  fillTop10Table(tab_nr);
}

function fillPersonalTable(level) {
  personal.innerHTML = "";
  let level_name = "";

  switch (level) {
    case 0:
      level_name = "easy";
      break;
    case 1:
      level_name = "medium";
      break;
    case 2:
      level_name = "hard";
      break;
    case 3:
      level_name = "hardcore";
      break;
  }

  const string_data = localStorage.getItem(level_name);
  if (string_data === "") {
    personal.innerText = "Leaderboard is empty";
    return;
  }

  const data = string_data.split(";");
  for (let i = 0; i < 10; i++) {
    let id = "";
    let name = "";
    let score = "";

    if (i < data.length) {
      const string_record = data[i].split(":");
      id = `${i + 1}.`;
      name = `${string_record[1]}`;
      score = `${string_record[2]}`;
    }

    const record = createScoreRecord(id, name, score);
    personal.appendChild(record);
  }
}

function fillTop10Table(level) {
  top_10.innerHTML = "";
  let empty = true;

  for (let i = 0; i < 10; i++) {
    let id = `${i + 1}.`;
    let name = `${scores[i + 10 * level].name}`;
    let score = `${scores[i + 10 * level].score}`;

    if (name === "" || score === 0) {
      id = "";
      name = "";
      score = "";
    } else empty = false;

    const record = createScoreRecord(id, name, score);
    top_10.appendChild(record);
  }

  if (empty) top_10.innerText = "Leaderboard is empty";
}

function createScoreRecord(id, name, score) {
  const record = document.createElement("div");
  record.className = "record flex-center-row";

  const nr_container = document.createElement("div");
  nr_container.className = "nr";
  nr_container.innerText = id;

  const name_container = document.createElement("div");
  name_container.className = "name";
  name_container.innerText = name;

  const score_container = document.createElement("div");
  score_container.className = "score";
  score_container.innerText = score;

  record.appendChild(nr_container);
  record.appendChild(name_container);
  record.appendChild(score_container);

  return record;
}
