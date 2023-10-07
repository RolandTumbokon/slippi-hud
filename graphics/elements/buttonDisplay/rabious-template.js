// Made by Rabious

import { html, css } from 'lit';
import {map} from 'lit/directives/map.js';


var maxHistoryLength = 9;
var imageWidth = 65; // in pixels

var inputHistory = [];
var buttons = {
	pressed: false,
	old: [],
	new: []
}
var lastInputFrame = 0;
var lastFrame = {
	controlStick: "",
	controlAngle: 0,
	A: false,
	B: false,
	CStick: "",
	L: 0,
	R: 0,
	X: false,
	Y: false,
	Z: false
};
var matchStarted = false;


export const template = function () {
	if (this.generalData.slippi.finished) {
		matchStarted = false;
		inputHistory = [];
		lastInputFrame = 0;
		return html``;
	}
	if (!this.ready || !matchStarted && !this.generalData.slippi.finished) {
		inputHistory = [];
		matchStarted = true;
		lastInputFrame = 0;
		return html``;
	}
	

	/*******************************************
				VARIABLES/HELPER FUNCTIONS
	********************************************/
	let newInput = html``;
	let hasChanged = false;
	var emptyInput = true;

	function change() {
		hasChanged = true;
	}

	function appendInput(string) {
		if (emptyInput) emptyInput = false;
		newInput = html`${newInput}${string}`;
		return true;
	}

	function prependInput(string) {
		if (emptyInput) emptyInput = false;
		newInput = html`${string}${newInput}`;
		return true;
	}


	/*******************************************
					CONTROL STICK
	********************************************/
	let controlStick = "";
	if (this.playerData[0].slippi.controller.mainStickY < -0.2750) {
		controlStick = "D";
	}
	else if (this.playerData[0].slippi.controller.mainStickY > 0.2750) {
		controlStick = "U";
	}
	if (this.playerData[0].slippi.controller.mainStickX < -0.2750) {
		controlStick += "L";
	}
	else if (this.playerData[0].slippi.controller.mainStickX > 0.2750) {
		controlStick += "R";
	}

	if (controlStick) {
		buttons.pressed = true;
		appendInput(html`<img src="img/buttons/Control_Stick-${controlStick}.svg">`);
		if (lastFrame.controlStick != controlStick) {
			change();
		}
	}

	/*******************************************
					C STICK
	********************************************/
	let CStick = "";
	if (this.playerData[0].slippi.controller.cStickY < -0.2750) {
		CStick = "D";
	}
	else if (this.playerData[0].slippi.controller.cStickY > 0.2750) {
		CStick = "U";
	}
	if (this.playerData[0].slippi.controller.cStickX < -0.2750) {
		CStick += "L";
	}
	else if (this.playerData[0].slippi.controller.cStickX > 0.2750) {
		CStick += "R";
	}

	if (CStick) {
		buttons.pressed = true;
		appendInput(html`<img src="img/buttons/C-Stick-${CStick}.svg">`);
		if (lastFrame.CStick != CStick) {
			change();
		}
	}	
	

	/*******************************************
					BUTTON PRESSES
	********************************************/
	buttons.old = [];
	buttons.new = [];

	function buttonPressed(input, buttonName) {
		if (input) {
			buttons.pressed = true;
			if (!lastFrame[buttonName]) {
				buttons.new.push(buttonName);
				change();
			} else { 
				buttons.old.push(buttonName);
			}
		}
	}
	function triggerPressed(input, triggerName) {
		if (input > 0.3) {
			// 	buttons.pressed = true;
			if (lastFrame[triggerName] <= 0.3) {
				buttons.new.push(triggerName);
				change();
			} else {
				buttons.old.push(triggerName);
			}
		}
	}
	buttonPressed(this.playerData[0].slippi.controller.pressedButtons.A, "A")	// A
	buttonPressed(this.playerData[0].slippi.controller.pressedButtons.B, "B")	// B
	triggerPressed(this.playerData[0].slippi.controller.leftTrigger + this.playerData[0].slippi.controller.pressedButtons.L, "L")	// L trigger
	triggerPressed(this.playerData[0].slippi.controller.rightTrigger + this.playerData[0].slippi.controller.pressedButtons.R, "R")	// R trigger
	buttonPressed(this.playerData[0].slippi.controller.pressedButtons.X, "X")	// X
	buttonPressed(this.playerData[0].slippi.controller.pressedButtons.Y, "Y")	// Y
	buttonPressed(this.playerData[0].slippi.controller.pressedButtons.Z, "Z")	// Z

	// Adding buttons to input
	buttons.old.map(button => prependInput(html`<img src="img/buttons/${button}.svg">`))
	buttons.new.map(button => appendInput(html`<img src="img/buttons/${button}.svg">`))

	lastFrame.CStick = CStick;
	lastFrame.A = this.playerData[0].slippi.controller.pressedButtons.A;
	lastFrame.B = this.playerData[0].slippi.controller.pressedButtons.B;
	lastFrame.L = this.playerData[0].slippi.controller.leftTrigger + this.playerData[0].slippi.controller.pressedButtons.L;
	lastFrame.R = this.playerData[0].slippi.controller.rightTrigger + this.playerData[0].slippi.controller.pressedButtons.R;
	lastFrame.X = this.playerData[0].slippi.controller.pressedButtons.X;
	lastFrame.Y = this.playerData[0].slippi.controller.pressedButtons.Y;
	lastFrame.Z = this.playerData[0].slippi.controller.pressedButtons.Z;
	lastFrame.controlStick = controlStick;
	
	/*******************************************
					INPUT HISTORY
	********************************************/
	// If no buttons are pressed this frame
	if (emptyInput) {
		appendInput(html`<img src="img/buttons/Control_Stick-.svg">`);
	}
	// Adds to history if new input detected
	newInput = html`<div class="input" id="${this.generalData.slippi.elapsedFrames}">${this.generalData.slippi.elapsedFrames - lastInputFrame} ${newInput}<div>`;
	if (hasChanged) {
		lastInputFrame = this.generalData.slippi.elapsedFrames;
		inputHistory.unshift(newInput);
		// Delete if history is full
		if (inputHistory.length > maxHistoryLength) {
			inputHistory.pop();
		}
	}


	return html`
		<style>
			img {
				width: ${imageWidth}px;
			}
			.input {
				display: flex;
			}
			div {
				font-size: ${imageWidth/2}px;
				line-height: 65px;
				color:#fff;
				text-shadow: rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px, rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px, rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px, rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px, rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px, rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px, rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px, rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px, rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px, rgb(0, 0, 0) 2.88051px -0.838247px 0px;
			}
		</style>
		<br>
		<ul id="history" style="list-style-type: none; margin: 0; padding: 0;">
			<li>${newInput}</li>
			${map(inputHistory, (input) => html`<li>${input}</li>`)}
		</ul>
	`;
}	
