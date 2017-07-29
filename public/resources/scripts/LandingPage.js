class LandingPage {

    constructor() {
        this.showMessageTimeout = null;
    };

    showQRSectionContainer() {

    	document.getElementsByClassName("QR_section_container")[0].style.display = "flex";
    	document.getElementsByClassName("IP_Address_section_container")[0].style.display = "none";
    };

    showIPAddressSectionContainer() {

    	document.getElementsByClassName("QR_section_container")[0].style.display = "none";
    	document.getElementsByClassName("IP_Address_section_container")[0].style.display = "flex";
    };

    showMessageContainer() {

    	document.getElementsByClassName("message_window_container")[0].style.top = "0";
    	// if(!this.showMessageTimeout)
    		this.showMessageTimeout = setTimeout(() => { this.hideMessageContainer() }, 2500)
    };

    hideMessageContainer() {

    	document.getElementsByClassName("message_window_container")[0].style.top = "-4em";
    	clearTimeout(this.showMessageTimeout);
    	this.showMessageTimeout = null;
    };

    deviceConnected() {

    	this.hideMessageContainer();
    	var message_container = document.getElementsByClassName("message_container")[0];

    	message_container.className = message_container.className.replace(" failed_message", "");
    	message_container.className += " successful_message";

    	this.showMessageContainer();
    };

    deviceDisconnected() {

    	this.hideMessageContainer();
    	var message_container = document.getElementsByClassName("message_container")[0];

    	message_container.className = message_container.className.replace(" successful_message", "");
    	message_container.className += " failed_message";

    	this.showMessageContainer();
    };

    toggleMenuContainer() {

    	var menu_container = document.getElementsByClassName("menu_container")[0];
    	var menu_container_display_value = window.getComputedStyle(menu_container).getPropertyValue("display");
    	menu_container.style.display = (menu_container_display_value === "flex") ? "none" : "flex";
    };
}
