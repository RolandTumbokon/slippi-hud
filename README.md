
# SlippiHUD

A nodecg package that can be used to power all kinds of slippi powered melee streams. You can create your own custom HUD, or an auto updating stream overlay.

I use this to track player's inputs and display them. Highly customizable with HTML and CSS


## Demo

__[![Watch the Demo](https://img.youtube.com/vi/qUuaYQbx2sY/hqdefault.jpg)](https://www.youtube.com/watch?v=qUuaYQbx2sY
)__

## Installation

Clone this repo on your Github Desktop. There are other ways, but this is the easiest. 


Install nodecg with npm in command prompt

```bash
  npm install --global nodecg-cli
  nodecg install
```

Make a folder in Documents to install nodecg

```bash
  cd Documents
  mkdir nodecg
  cd nodecg
```
    
Run slippihud.bat and uncomment code for first time installs and change directory name from mine

This will copy files over to the nodecg folder where nodecg will install and run
## Run Locally

Go to http://localhost:9090/ in your browser. This is where nodecg framework is held 

Make sure to hit "Connect" to connect to slippi. and 'rabious-template' is the Active Template

On the top right, there is a button that will take you to the Graphics pages. buttondisplay.html and 
buttondisplay2.html is where the inputs are displayed

## Connect to OBS

Create a new browser source in OBS with the URL of the button displays. The width and height is dependent on your stream setup. 

Add custom CSS: 

```
   body { background-color: rgba(0, 0, 0, 0); margin: 0px auto; overflow: hidden; }

```
Do this for both HTML pages. At this point everything should be working. If it doesn't work head to the __[main wiki](https://github.com/SSBDoppler/slippi-hud/wiki)__


## Forked from __[slippi-hud](https://github.com/SSBDoppler/slippi-hud)__
