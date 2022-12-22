"use strict";

const address             = window.location.href;
const html                = document.querySelector("html");
const black_screen        = document.querySelector(".black-screen");

/* ---------- game canvas and ui ---------- */
const lines_container     = document.querySelector(".lines");
const bg1                 = document.querySelectorAll(".bg1");
const bg2                 = document.querySelectorAll(".bg2");
const counter             = document.querySelector(".counter");

/* ---------- audio ---------- */
const menu_music        = new Audio("Sounds/menu.mp3");
const game_music        = new Audio("Sounds/game.mp3");
const car_explosion     = new Audio("Sounds/car_explosion.mp3");
const car_crash         = new Audio("Sounds/car_crash.mp3");
const car_hit_tree      = new Audio("Sounds/car_hit_tree.mp3");
const car_tires_screech = new Audio("Sounds/car_tires_screech.mp3");
const points_count      = new Audio("Sounds/points_count.wav");
const deer_death        = new Audio("Sounds/deer_death.wav");
const deer_laugh        = [
  new Audio("Sounds/deer_laugh1.wav"),
  new Audio("Sounds/deer_laugh2.wav"),
  new Audio("Sounds/deer_laugh3.wav"),
  new Audio("Sounds/deer_laugh4.wav"),
  new Audio("Sounds/deer_laugh5.wav")
];

/* ---------- images ---------- */
const player_img  = createImage("Images/Game/player.png");
const enemy_img   = createImage("Images/Game/enemy.png");
const blood_img   = createImage("Images/Game/blood.png");
const deer_img = {
  left:   createImage("Images/Game/deer_left.png"),
  right:  createImage("Images/Game/deer_right.png"),
};
const deer_laugh_img = {
  left:   createImage("Images/Game/deer_left_smile.png"),
  right:  createImage("Images/Game/deer_right_smile.png"),
};

const explosion_img = [];
for (let i = 0; i <= 13; i++) {
  const explosion_frame = createImage(`Images/Game/Explosion/${i}.png`);
  explosion_img.push(explosion_frame);
}

/* ---------- init personal records ---------- */
if (localStorage.getItem("easy")      === null) localStorage.setItem("easy", "");
if (localStorage.getItem("medium")    === null) localStorage.setItem("medium", "");
if (localStorage.getItem("hard")      === null) localStorage.setItem("hard", "");
if (localStorage.getItem("hardcore")  === null) localStorage.setItem("hardcore", "");

function createImage(path) {
  const img = new Image();
  img.src = path;

  return img;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fadeIn(elem) {
  elem.style.visibility = "visible";
  elem.style.opacity = "1";
}

function fadeOut(elem) {
  elem.style.opacity = "0";
  setTimeout(() => (elem.style.visibility = "hidden"), 1500);
}
