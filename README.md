# DeerKiller Readme
<details>
  <summary>❓Why the page is not loading❓</summary>
  Due to usage of PHP and MySQL for saving the best scores I had to use hosting which support for this technology. 
  I have no money so I had to use a free hosting which unfortunately puts websites to sleep. 
  Juts wait a few minutes and it should work.
</details>
<details>
  <summary>❓Why sounds starts playing after first click and not when I open the page❓</summary>
  It's because auto playing sounds is blocked by browser until the user interact with the document.
</details>
<details>
  <summary>❓Why my commits often have no names❓</summary>
  <ul>
    <li>I tend to create with bursts many things at once</li>
    <li>Sometimes I have bad internet connection and I can't send separate commits</li>
    <li>Describing commits doesn't matter when I'm coding alone</li>
  <ul>
</details>
<details>
  <summary>❓Why I'm using only one branch❓</summary>
  It's for the similar reasons as with commits.  
  <ul>
    <li>I do many things at once</li>
    <li>I don't plan things ahead, I just go in and create things that seems good</li>
    <li>I'm coding alone so I know the code and there is nothing I can break</li>
  <ul>
</details>

## Table of Contents
* [Informations](#informations)
  * [Technologies](#technologies)
  * [Features](#features)
  * [Setup](#setup)
  * [Acknowledgements](#acknowledgements)
* [Details](#details)
  * [User interface](#user-interface)
  * [Project structure](#project-structure)
  * [Code organization](#code-organization)

<br>

## Informations
Arcade racing game with the goal to get as many points as possible in one attempt by killing deers and avoiding cars. <br>
See [live demo](https://pas-artur.000webhostapp.com/deer-killer/).

![preview](/_for_readme/preview.png)

----------------------------------

### Technologies
- HTML5
- CSS3
- JS
- PHP 8.1.12
- Apache 2.4.54 
- phpMyAdmin 5.2.0

Languages:
- HTML
- CSS
- JS
- PHP
  
Libraries:
- [FontAwesome](https://fontawesome.com) 6.2.1
  
Programs:
- [XAMPP](https://www.apachefriends.org/pl/index.html)
- [VSCode](https://code.visualstudio.com)
- [Prepros](https://prepros.io)
  
----------------------------------

### Features
- Player movement
- Spawning enemies that kills player
- Spawning deers that can be killed by enemy or player giving him points
- Three lives, barrier when killed, energy and slowing time skill
- Points counter
- Saving best score
- Menu, Difficulty levels, Leaderboard and Credits
- Start animation
- Transition animations
- Game over slip and laughing deers animation
- Full screen and mute options

----------------------------------

### Setup
To run this program: 
- Use the [live demo](https://pasek108.github.io/GoblinSlayer/)
- Download this repo and:
  - run index.html file
  - or start live server ([VSCode LiveServer Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), Prepros preview etc.) 

To edit program:
- Download this repo
- Install [Prepros](https://prepros.io)
- Add this project in Prepros
- Start coding

----------------------------------

### Acknowledgements
#### Images
- [Menu logo](https://pixabay.com/vectors/traffic-sign-road-sign-caution-deer-3015221/)
- [Menu blood](https://www.transparentpng.com/download/blood-splatter-cut-out_14064.html)
- [Menu underline](https://www.dreamstime.com/red-highlighter-marker-red-highlighter-marker-strokes-vector-brush-pen-underline-lines-image129437064)
- [Deer skull](https://www.deviantart.com/seansan1/art/First-Attempt-at-Pixel-Art-Deer-Skull-644362445)
- [Cars](https://www.spriters-resource.com/nes/supercars/sheet/102985/)
- [Blood](http://pixelartmaker.com/art/a3c176205942be4)
- [Car explosion](https://nyknck.itch.io/explosion)
- [Forest background](https://elthen.itch.io/2d-pixel-art-forest-tileset)

#### Music
- [Menu music](https://www.youtube.com/watch?v=k68thGEDlx8)
- [Game music](https://www.youtube.com/watch?v=XkDZxO-Fn3E)

#### Fonts
- [Royal fighter](https://fontmeme.com/fonts/royal-fighter-font/)
- [Edit undo](https://www.1001fonts.com/edit-undo-font.html)

#### Sounds
- [Car crush](https://www.freesoundslibrary.com/car-crash-sound-effect/)
- [Car explosion](https://www.freesoundeffects.com/free-track/bomb-2-466478/)
- [Tires screech](https://bigsoundbank.com/detail-2370-screeching-tires-3.html)
- [Car crash on tree](https://www.youtube.com/watch?v=Go19ucS43OM)
- [Points count](https://freesound.org/people/xtrgamr/sounds/253546/)
- [Deer laugh 1](https://mixkit.co/free-sound-effects/laugh/)
- [Deer laugh 2](https://mixkit.co/free-sound-effects/laugh/)
- [Deer laugh 3](https://mixkit.co/free-sound-effects/laugh/)
- [Deer laugh 4](https://mixkit.co/free-sound-effects/laugh/)
- [Deer laugh 4](https://mixkit.co/free-sound-effects/laugh/)

<br>

## Details
This section is a general description of the project required to understand how it works, the exact details are in the code or simply are the code.

### User interface
#### Main menu
![main menu](/_for_readme/main_menu.png)
Main menu has:
- Animated snow background
- Mute/unmute sound button
- Three options too choose:
  - Start option will hide the menu and runs the game
  - Achievements option will show the achievements view
  - Credits option will show the credits view

----------------------------------

#### Achievements
![achievements](/_for_readme/achievements.png)
Achievements view shows achievements, each of which has:
- Title ribbon
- Three stars that indicate completion of a given level
- Target text with current value of achievement and required value for next level (if it's not already max level)
- Progress bar

Achievements has 3 levels to complete and 4 possible stages:
- Stage 0:
  - Gray border
  - Disabled all stars
  - Progess bar empty or bronze color (going to bronze level)
- Stage 1:
  - Bronze border
  - Bronze star lighted up
  - Silver progess bar color (going to silver level)
- Stage 2:
  - Silver border
  - Silver and bronze stars lighted up
  - Gold progess bar color (going to gold level)
- Stage 3:
  - Gold border
  - All stars lighted up
  - Gold progess bar color (gold level is max and it is completed)

----------------------------------

#### Credits
![credits](/_for_readme/credits.png)
Credits page contains 2 sections with links for resources used in the project and link to my github

----------------------------------

#### Game
![in game](/_for_readme/in_game.png)
At the top of the game view are wave and killed goblins counters and at the bottom is an instruction on what keys are used to play the game.

The way the game works is simple:
- Player is standing in the middle
- Game generates random waves of goblins which runs towards the player
- Player has to use keys A and D to face left or right direction
- If player is facing goblin direction, he will kill the goblin, otherwise player will lose
- When player clears a wave, new one is generated with more goblins that are faster

----------------------------------

#### Game over
![game over](/_for_readme/game_over.png)
Game over view displays survived waves, killed goblins and button that goes back to main menu

----------------------------------

### Project structure
The project directory tree looks like this:
- :file_folder: GoblinSlayer (project folder)
  - :page_facing_up: *git config*
  - :page_facing_up: *prepros config*
  - :page_facing_up: *index.html file*
  - :page_facing_up: *readme*
  - :file_folder: _for_readme
    - :page_facing_up: *files for readme*
  - :file_folder: Images
    - :page_facing_up: *images used in the project*
  - :file_folder: Sound
    - :page_facing_up: *sounds and music used in project*
  - :file_folder: Scripts
    - :page_facing_up: *scripts used in project*
  - :file_folder: Styles
    - :page_facing_up: *css files compiled from scss by prepros*
    - :file_folder: scss
      - :page_facing_up: *sccs files*

----------------------------------

### Code organization

![program diagram](/_for_readme/program_diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

Menu is entry of the program.

Menu creates and manages one instantiation of each of the classes:
- SnowyBackground
- Game
- Achievements
- Credits

Game class creates and manages:
- One instance of Hero class
- Many instances of Goblin class

