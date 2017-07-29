function positionControls() {

	var left_joystick_container = document.getElementsByClassName("left_joystick_container")[0];
	var left_arrows_container = document.getElementsByClassName("left_arrows_container")[0];

	var left_joystick_container_width = parseFloat(window.getComputedStyle(left_joystick_container).getPropertyValue("width"));
	var left_joystick_container_height = parseFloat(window.getComputedStyle(left_joystick_container).getPropertyValue("height"));
	var left_joystick_container_left = parseFloat(window.getComputedStyle(left_joystick_container).getPropertyValue("left"));

	left_arrows_container.style.left = left_joystick_container_left + ( left_joystick_container_width * 0.50 ) + "px";
	left_arrows_container.style.top = ( left_joystick_container_height ) + "px";
}

window.onload = function() {

	console.log("Hello from Game Cube!");

	showLoadingImage();
	toggleWarningMessage();
	positionControls();
	
}