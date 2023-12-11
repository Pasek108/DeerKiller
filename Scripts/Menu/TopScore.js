"use strict"

class TopScore extends MenuWindow {
  constructor(class_name, position, menu_container) {
    super(class_name, position, menu_container)

    /* ---------- init personal records ---------- */
    if (localStorage.getItem("easy") === null) localStorage.setItem("easy", "")
    if (localStorage.getItem("medium") === null) localStorage.setItem("medium", "")
    if (localStorage.getItem("hard") === null) localStorage.setItem("hard", "")
    if (localStorage.getItem("hardcore") === null) localStorage.setItem("hardcore", "")

    this.options = this.container.querySelectorAll(".level-tabs .tab")
    this.personal_top10 = document.querySelector(".personal")
    this.general_top_10 = document.querySelector(".top10")

    this.scores = this.getScores()

    for (let i = 0; i < this.options.length; i++) {
      this.options[i].addEventListener("click", () => this.activateScoreTab(i))
    }
  }

  getScores() {
    const url = new URL(window.location.href + "get_scores.php")

    const request = new XMLHttpRequest()
    request.open("GET", url, true)
    request.send()

    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        const data = JSON.parse(request.responseText)
        this.scores = data
      }
    }

    return this.scores
  }

  activateScoreTab(tab_nr) {
    this.options.forEach((option) => option.classList.remove("active"))
    this.options[tab_nr].classList.add("active")

    this.fillPersonalTop10(tab_nr)
    this.fillGeneralTop10(tab_nr)
  }

  fillPersonalTop10(level) {
    const levels = ["easy", "medium", "hard", "hardcore"]

    this.personal_top10.innerHTML = ""
    let level_name = levels[level]

    const string_data = localStorage.getItem(level_name)
    if (string_data === "") {
      this.personal_top10.innerText = "Leaderboard is empty"
      return
    }

    const data = string_data.split(";")
    for (let i = 0; i < data.length && i < 10; i++) {
      const string_record = data[i].split(":")

      const id = `${i + 1}.`
      const name = `${string_record[1]}`
      const score = `${string_record[2]}`

      const record = this.createScoreRecord(id, name, score)
      this.personal_top10.appendChild(record)
    }
  }

  fillGeneralTop10(level) {
    this.general_top_10.innerHTML = ""
    let empty = true

    for (let i = 0; i < 10; i++) {
      const id = `${i + 1}.`
      const name = `${this.scores[i + 10 * level].name}`
      const score = `${this.scores[i + 10 * level].score}`

      if (name === "" || score === 0) continue
      else empty = false

      const record = createScoreRecord(id, name, score)
      this.general_top_10.appendChild(record)
    }

    if (empty) this.general_top_10.innerText = "Leaderboard is empty"
  }

  createScoreRecord(id, name, score) {
    const record = document.createElement("div")
    record.className = "record flex-center-row"

    const nr_container = document.createElement("div")
    nr_container.className = "nr"
    nr_container.innerText = id

    const name_container = document.createElement("div")
    name_container.className = "name"
    name_container.innerText = name

    const score_container = document.createElement("div")
    score_container.className = "score"
    score_container.innerText = score

    record.appendChild(nr_container)
    record.appendChild(name_container)
    record.appendChild(score_container)

    return record
  }
}
