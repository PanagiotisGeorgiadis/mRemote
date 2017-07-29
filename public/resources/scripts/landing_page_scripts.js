// function showQRSectionContainer() {
//
// 	document.getElementsByClassName("QR_section_container")[0].style.display = "flex";
// 	document.getElementsByClassName("IP_Address_section_container")[0].style.display = "none";
// };
//
// function showIPAddressSectionContainer() {
//
// 	document.getElementsByClassName("QR_section_container")[0].style.display = "none";
// 	document.getElementsByClassName("IP_Address_section_container")[0].style.display = "flex";
// };
//
// var showMessageTimeout = null;
//
// const showMessageContainer = function() {
//
// 	document.getElementsByClassName("message_window_container")[0].style.top = "0";
// 	if(!showMessageTimeout)
// 		showMessageTimeout = setTimeout(function() { hideMessageContainer() }, 2500)
// }
//
// const hideMessageContainer = function() {
//
// 	document.getElementsByClassName("message_window_container")[0].style.top = "-4em";
// 	clearTimeout(showMessageTimeout);
// 	showMessageTimeout = null;
// }
//
// function deviceConnected() {
//
// 	hideMessageContainer();
// 	var message_container = document.getElementsByClassName("message_container")[0];
//
// 	message_container.className = message_container.className.replace(" failed_message", "");
// 	message_container.className += " successful_message";
//
// 	showMessageContainer();
// }
//
// function deviceDisconnected() {
//
// 	hideMessageContainer();
// 	var message_container = document.getElementsByClassName("message_container")[0];
//
// 	message_container.className = message_container.className.replace(" successful_message", "");
// 	message_container.className += " failed_message";
//
// 	showMessageContainer();
// }
//
// function toggleMenuContainer() {
//
// 	var menu_container = document.getElementsByClassName("menu_container")[0];
// 	var menu_container_display_value = window.getComputedStyle(menu_container).getPropertyValue("display");
//
// 	menu_container.style.display = (menu_container_display_value === "flex") ? "none" : "flex";
// }

window.onload = function() {

	var hostScripts = new HostScripts();
	var landingPage = new LandingPage();

	hostScripts.showLoadingImage();

	hostScripts.getServerInfo()
	.then(function(response) {

		console.log(response);
		hostScripts.hideLoadingImage();
		hostScripts.drawServerInfo(response);
		landingPage.showQRSectionContainer();
	})
	.catch(function(error) {
		console.error(error);
	});


	var toggle_QR_button = document.getElementsByClassName("toggle_QR_button")[0];
	toggle_QR_button.onclick = function() {
		landingPage.showIPAddressSectionContainer();
	}

	var toggle_IP_Address_section_button = document.getElementsByClassName("toggle_IP_Address_section_button")[0];
	toggle_IP_Address_section_button.onclick = function() {
		landingPage.showQRSectionContainer();
	}

	var close_message_button = document.getElementsByClassName("close_message_button")[0];
	close_message_button.onclick = function() {
		landingPage.hideMessageContainer();
	}

	var menu_trigger_button = document.getElementsByClassName("menu_trigger_button")[0];
	menu_trigger_button.onclick = function() {
		landingPage.toggleMenuContainer();
	}
}
