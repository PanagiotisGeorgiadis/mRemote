function showQRSectionContainer() {

	document.getElementsByClassName("QR_section_container")[0].style.display = "flex";
	document.getElementsByClassName("IP_Address_section_container")[0].style.display = "none";
};

function showIPAddressSectionContainer() {

	document.getElementsByClassName("QR_section_container")[0].style.display = "none";
	document.getElementsByClassName("IP_Address_section_container")[0].style.display = "flex";
};

var showMessageTimeout = null;

const showMessageContainer = function() {

	document.getElementsByClassName("message_window_container")[0].style.top = "0";
	if(!showMessageTimeout)
		showMessageTimeout = setTimeout(function() { hideMessageContainer() }, 2500)
}

const hideMessageContainer = function() {

	document.getElementsByClassName("message_window_container")[0].style.top = "-4em";
	clearTimeout(showMessageTimeout);
	showMessageTimeout = null;
}

function deviceConnected() {

	hideMessageContainer();
	var message_container = document.getElementsByClassName("message_container")[0];

	message_container.className = message_container.className.replace(" failed_message", "");
	message_container.className += " successful_message";
  
  showMessageContainer();
}

function deviceDisconnected() {

	hideMessageContainer();
	var message_container = document.getElementsByClassName("message_container")[0];

	message_container.className = message_container.className.replace(" successful_message", "");
	message_container.className += " failed_message";
  
  showMessageContainer();
}

window.onload = function() {


	var hostScripts = new HostScripts();
	hostScripts.showLoadingImage();

	hostScripts.getServerInfo()
	.then(function(response) {

		console.log(response);
		hostScripts.hideLoadingImage();
		hostScripts.drawServerInfo(response);
	})
	.catch(function(error) {
		console.error(error);
	});

	var close_message_button = document.getElementsByClassName("close_message_button")[0];

	close_message_button.onclick = function() {
		hideMessageContainer();
	}
}