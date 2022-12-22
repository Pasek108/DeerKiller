# Deer Killer
 Racing game in pure JS / CSS / HTML based on Road Fighter (NES). Rules are simple, player has to get as many points as possible, points are given for riding and killing deers (+1000). Player has 3 lives that he will lost when he touch enemy car, if so, he gets shield that protect him for next 3 seconds. If player lost all of his lives game is over and he can save the score and then start again. There is also a slow time skill for helping player, every 3000 points it gets 1 stack of energy, each stack let use skill for 1s (max 5s).
<details>
    <summary><b>Screenshots</b></summary>
    <img alt="Menu" src="https://github.com/Pasek108/Deer-Killer/blob/main/readme-images/menu.png">
    <img alt="Game" src="https://github.com/Pasek108/Deer-Killer/blob/main/readme-images/game.png">
    <img alt="Game Over" src="https://github.com/Pasek108/Deer-Killer/blob/main/readme-images/game_over.png">
</details> 

## How it works
### Menu
Menu starts with few animations:
1. Change background from white to black
2. Fade out road sign
3. Replace road sign with bloody sign and fade out title
4. Resize sign and move it to top while sliding in menu options from bottom
<details>
    <summary><b>Animation</b></summary>
    <img alt="Menu start animation" src="https://github.com/Pasek108/Deer-Killer/blob/main/readme-images/menu_animation.gif">
</details> 

Menu has 3 options:
* Start - lets you chose difficulty and start game
* Top Score - shows your and all time players top 10 games for each level
* Credits - links resources i used to make this game
<details>
    <summary><b>Options scrrenshots</b></summary>
    <img alt="Menu difficulty tab" src="https://github.com/Pasek108/Deer-Killer/blob/main/readme-images/menu_difficulty.png">
    <img alt="Menu top score tab" src="https://github.com/Pasek108/Deer-Killer/blob/main/readme-images/menu_top_score.png">
    <img alt="Menu credits tab" src="https://github.com/Pasek108/Deer-Killer/blob/main/readme-images/menu_credits.png">
</details> 

### Game
Games start with count from 3 to 1 and it begins. 

## Road and background
Game consist of four canvases, three of them are background and one is game itself. For background there are two canvases with trees image and one with gray background and road lanes, all of them are moving in loop with synchronized speed. Player, enemies and deers are painted in the main canvas over the middle one with road background, all collision detections happens here.
<details>
    <summary><b>Game background scrrenshot</b></summary>
    <img alt="Game background" src="https://github.com/Pasek108/Deer-Killer/blob/main/readme-images/game_background.png">
</details> 

## Interface
Inferface is build of 3 elements, healt bar, energy bar and points counter. All three works in the same way, they have conatiners that are edited when there is a need.
<details>
    <summary><b>Game interface scrrenshot</b></summary>
    <img alt="Game interface" src="https://github.com/Pasek108/Deer-Killer/blob/main/readme-images/game_interface.png">
</details> 

## Enenmies position algorithm
Some amount of enemy cars (dependent of difficulty level) starts falling from top with random positions and speeds using the following algorithm:
* Random new position
* Compare with all other cars and count correct positions:
   1. Check if cars are not in the same column - position correct, skip next 2
   2. If not check if the speed of the bottom car is higher so they will never touch - position correct, skip next one
   3. If not, check if speed of upper car is low enough that they will dont touch on the screen - position correct
   4. If the above are not correct random new position and check again

## Deers
Deers spawn in radom intervals of time with random position and vector. If they touch enemy they die. If killed by player, they gives 1000 point and die. If they reach other side of road they respawn again for a random amount of time. If deer is dead his image is swaped for blood and his vector.x is set to 0.

## Player
Player has event listener for mouse movement and key press for activating slowmo. Movement of player is limited by size of the road.

## Game over animation
When player loses his last life, game over animation is fired, enemies explode while player start sliding to the closest side of the road, if he pass road size limit happy deers appears and starts laughing at the player for 3s, then game over screen slides from top and player can save score and/or back to menu.
<details>
    <summary><b>Game over animation</b></summary>
    <img alt="Game over animation" src="https://github.com/Pasek108/Deer-Killer/blob/main/readme-images/game_over_animation.gif">
</details> 

## Game over screen
Game over screen contains "Game over text" and 3 types of buttons.
* Back to menu button - resets game, fade out game and fade in menu
* Save score button - chnges text in button to Send score and "Game Over" text to name input and counter with couting score animation
* Send score button - if name is correct sends score to leaderboard and changes itself to Back to menu button
<details>
    <summary><b>Game over screen</b></summary>
    <img alt="Game over screen" src="https://github.com/Pasek108/Deer-Killer/blob/main/readme-images/game_over_save.png">
</details> 
