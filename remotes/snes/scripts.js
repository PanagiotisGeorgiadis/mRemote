// It is not needed for now.
function positionControls() {
}

window.onload = function() {

	console.log("Hello from Super Nintendo!");

	showLoadingImage();
	toggleWarningMessage();
	positionControls();

	var buttons = document.getElementsByClassName("clickable");

	for(var i = 0; i < buttons.length; i++) {

		buttons[i].onmousedown = function() {

			this.className += " active";
		}

		buttons[i].onmouseup = function() {
			
			this.className = this.className.replace(" active", "");
		}

		buttons[i].onmouseleave = function() {
			
			this.className = this.className.replace(" active", "");
		}
	}
	
}
