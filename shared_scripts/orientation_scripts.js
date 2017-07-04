var timeoutVariable = null;

function drawLoadingImageContainer() {

	var body = document.getElementsByTagName("body")[0];
	var loading_image_container = document.createElement("div");
	var loading_image = document.createElement("img");

	loading_image_container.id = "loading_image_container";

	loading_image.setAttribute("src", "/images/Loading_icon.gif");
	loading_image_container.appendChild(loading_image);
	body.appendChild(loading_image_container);
}

function showLoadingImage() {

	var controller_container = document.getElementById("controller_container");
	var loading_image_container = document.getElementById("loading_image_container");
	var warning_message_container = document.getElementById("warning_message_container");

	if(!loading_image_container) {

		drawLoadingImageContainer();
		showLoadingImage();
		return;
	}

	loading_image_container.style.display = "flex";
	
	if(warning_message_container)
		warning_message_container.style.display = "none";
	
	if(controller_container)
		controller_container.style.display = "none";
}

function hideLoadingImage() {

	var loading_image_container = document.getElementById("loading_image_container");

	if(loading_image_container)
		loading_image_container.style.display = "none";
}

function drawWarningMessageContainer() {

	var body = document.getElementsByTagName("body")[0];
	var warning_message_container = document.createElement("div");
	var warning_message_text = document.createElement("p");

	warning_message_container.id = "warning_message_container";
	warning_message_text.className = "warning_message_text";

	warning_message_text.innerHTML = "Please turn your device to <span class=\"warning_message_highlighted\">Landscape Mode</span> in order to resume.";
	warning_message_container.appendChild(warning_message_text);
	body.appendChild(warning_message_container);
}

function toggleWarningMessage() {

	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var controller_container = document.getElementById("controller_container");
	var warning_message_container = document.getElementById("warning_message_container");

	if(controller_container) {

		if(!warning_message_container) {

			drawWarningMessageContainer();
			toggleWarningMessage();
			return;
		}

		if(windowHeight > windowWidth) {

			controller_container.style.display = "none";
			warning_message_container.style.display = "flex";

		} else {

			controller_container.style.display = "flex";
			warning_message_container.style.display = "none";
		}

		hideLoadingImage();
	}
};

window.addEventListener("orientationchange", function(event) {

	showLoadingImage();
	if(timeoutVariable)
		clearTimeout(timeoutVariable);

	timeoutVariable = setTimeout(function() {

		toggleWarningMessage();
	}, 500);
});

/*window.onload = function() {

	toggleWarningMessage();
};*/