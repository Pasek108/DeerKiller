<h1 align="center">DeerKiller</h1>
<p align="center">
  <strong>
    A fast-paced arcade racing game. The player must survive for as long as possible by weaving through traffic and hunting deer to achieve high scores.
  </strong>
</p>

<br>

# Overview :sparkles:

## About
DeerKiller is a 2D arcade game built with Vanilla JavaScript and the HTML5 Canvas. It features a fast-paced "infinite-road" gameplay loop where players must navigate through traffic and run over deers to get bonus points and charge slow-motion ability.

Check out the [live version](https://artur-pas.000webhostapp.com/DeerKiller/).

![preview](/_for_readme/preview.png)

## Features
- Enemies: high-speed cars that trigger explosions and life-loss on collision.
- Deers: bonus targets that provide extra points when hit.
- Invulnerability period after taking damage.
- Slow-Motion mechanic.
- Four levels of difficulty.
- Highscores for each difficulty.
- Smooth animations and trasitions.
- Seamless restart.

## Technologies
- HTML 5
- CSS 3
- JavaScript

<!--
## Acknowledgements
### Images
- [Menu logo](https://pixabay.com/vectors/traffic-sign-road-sign-caution-deer-3015221/)
- [Menu blood](https://www.transparentpng.com/download/blood-splatter-cut-out_14064.html)
- [Menu underline](https://www.dreamstime.com/red-highlighter-marker-red-highlighter-marker-strokes-vector-brush-pen-underline-lines-image129437064)
- [Deer skull](https://www.deviantart.com/seansan1/art/First-Attempt-at-Pixel-Art-Deer-Skull-644362445)
- [Cars](https://www.spriters-resource.com/nes/supercars/sheet/102985/)
- [Blood](http://pixelartmaker.com/art/a3c176205942be4)
- [Car explosion](https://nyknck.itch.io/explosion)
- [Forest background](https://elthen.itch.io/2d-pixel-art-forest-tileset)

### Music
- [Menu music](https://www.youtube.com/watch?v=k68thGEDlx8)
- [Game music](https://www.youtube.com/watch?v=XkDZxO-Fn3E)

### Fonts
- [Royal fighter](https://fontmeme.com/fonts/royal-fighter-font/)
- [Edit undo](https://www.1001fonts.com/edit-undo-font.html)

### Sounds
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

-->

<br>

# Details 📜

## UI & Application Flow

### Main menu
After the opening animation, the user is presented with the main menu. From here, the user can toggle sound in the top-right corner or navigate through the difficulty, high score, and credits windows.

![main menu](/_for_readme/main_menu.png)

----------------------------------

### Top score
The high score window allows players to view their top 10 personal records for each difficulty level. (Global leaderboards are currently disabled due to hosting limitations).

![top_score](/_for_readme/top_score.png)

----------------------------------

### Credits
The credits window acknowledges the resources used in the game and provides links to their original sources.

![credits](/_for_readme/credits.png)

----------------------------------

#### Difficulty
In the difficulty window, the user can select their preferred level of challenge before starting the game.

![difficulty](/_for_readme/difficulty.png)

----------------------------------

### Game
The game begins with a 3-second countdown. Players must avoid traffic (red cars) and run over deer to earn bonus points. For every 3,000 points earned, the player receives an energy point. These points can be exchanged for slow-motion usage (1 energy point = 1 second).

![game](/_for_readme/game.png)

Players start with 3 lives. If hit by an enemy car, the player loses a life, the enemy vehicle explodes, and the player receives a 3-second invulnerability shield.

![game_hit](/_for_readme/game_hit.png)

----------------------------------

### Game over
Once all lives are lost, the Game Over screen appears. This allows the user to save their score locally or return to the main menu.

![game over](/_for_readme/game_over.png)


<!--
----------------------------------

### Project structure
The project directory tree looks like this:
- :file_folder: DeerKiller (project folder)
  - :page_facing_up: *github config*
  - :page_facing_up: *readme file*
  - :page_facing_up: *index.html file*
  - :file_folder: _for_readme - :page_facing_up: *files for readme*
  - :file_folder: Sounds - :page_facing_up: *sounds and music used in project*
  - :file_folder: Images
    - :file_folder: UI - :page_facing_up: *images for user interface*
    - :file_folder: Game - :page_facing_up: *images used in the game*
  - :file_folder: PHP
    - :page_facing_up: *mysql database file*
    - :page_facing_up: *php files for saving and getting the score*
  - :file_folder: Scripts
    - :file_folder: Menu - :page_facing_up: *scripts for menu*
    - :file_folder: Game
      - :page_facing_up: *scripts for game*
      - :file_folder: UI - :page_facing_up: *scripts for user interface in game*
  - :file_folder: Styles
    - :page_facing_up: *css files*
    - :file_folder: fonts - :page_facing_up: *fonts used in the project*

----------------------------------

### Code organization

![program diagram](/_for_readme/program_diagram.png)

> [!WARNING]  
> Classes must be loaded from bottom to the top to avoid situation when class does not exist in the time of its objects creation

Menu is entry of the program.

Menu creates and manages one instance of each of the classes:
- MenuWindow (Credits)
- Difficulty
- TopScore
- Game

Difficulty and TopScore classes are extension of MenuWindow class which is responsible for showing and hiding menu window with transition

Game class creates and manages:
- One instance of RoadBackground class
- Two instances of treesBackground class (left and right side)
- One instance of classes:
  - HealthBar
  - EnergyBar
  - PointsCounter
  - GameOver
- One instance of Player class
- Many instances of classes:
  - Enemy
  - Deer
  - HappyDeer
-->
