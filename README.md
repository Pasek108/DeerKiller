# DeerKiller Readme
<details>
  <summary>❓Why the page is not loading❓</summary>
  Due to usage of PHP and MySQL for saving the best scores so I had to use hosting that supports this technology. 
  I have no money so I had to use a free one that puts websites to sleep. Juts wait a few minutes and it should work.
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
- [SCSS](https://sass-lang.com)
- JS
  
Libraries:
- [FontAwesome](https://fontawesome.com) 6.2.1
- [GoogleFonts](https://fonts.google.com)
  
Programs:
- [VSCode](https://code.visualstudio.com)
- [Prepros](https://prepros.io) (auto preview, processing scss, project organization)
  
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
- [Menu background](https://i.imgur.com/LAFEmei.png)
- [Achievement ribbon](https://svgsilh.com/image/1093181.html)
- [Achievement star](https://svgsilh.com/image/775819.html)
- [Game background](https://lil-cthulhu.itch.io/pixel-art-cave-background)
- [Game background floor](https://lil-cthulhu.itch.io/pixel-art-tileset-cave)
- [Hero sprite](https://www.spriters-resource.com/ds_dsi/rondoofswords/sheet/42664/)
- [Goblin sprite](https://www.spriters-resource.com/psp/lunarsilverstarharmony/sheet/58114/)

#### Music and sounds
- [Menu music](https://opengameart.org/content/fantasy-music-the-wraiths-of-winter)
- [Menu option select](https://opengameart.org/content/menu-selection-click)
- [Game music 1](https://opengameart.org/content/massacre-soundtrack)
- [Game music 2](https://opengameart.org/content/fight-theme-metal)
- [Game music 3](https://filmmusic.io/song/4814-metalicious)
- [Game over music](https://freesound.org/people/HerbertBoland/sounds/128554/)
- [Goblin death](https://freesound.org/people/Rickplayer/sounds/398007/)

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

