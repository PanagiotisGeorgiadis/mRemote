/*var serverInfo = null;

function getServerInfo() {

	return new Promise(function(resolve, reject) {

		var xhr = new XMLHttpRequest();
		var method = "GET";
		var url = "/serverInfo";

		xhr.onreadystatechange = function() {

			if(xhr.readyState === 4) {

				if(xhr.status === 200)
					resolve(JSON.parse(xhr.responseText));
				else
					reject("Response status " + xhr.status);				
			}
		}

		xhr.onerror = function(error) {

			if(xhr.status == 0) 
				reject(error);
			else
				reject(error);
		}

		xhr.open(method, url, true);
		xhr.send();
	});
}

function showLoadingImage() {

	document.getElementsByClassName("loading_icon_container")[0].style.display = "flex";
}

function hideLoadingImage() {

	document.getElementsByClassName("loading_icon_container")[0].style.display = "none";
}

function drawServerInfo(serverInfo) {

	var content_container = document.getElementsByClassName("content_container")[0];
	var QR_section_container = document.getElementsByClassName("QR_section_container")[0];
	var connection_qr_image = document.createElement("img");

	connection_qr_image.className = "connection_qr_image";
	connection_qr_image.src = serverInfo.QRCodeImageSource;

	QR_section_container.appendChild(connection_qr_image);

	content_container.style.display = "flex";
}*/

function showQRSectionContainer() {

	document.getElementsByClassName("QR_section_container")[0].style.display = "flex";
	document.getElementsByClassName("IP_Address_section_container")[0].style.display = "none";
};

function showIPAddressSectionContainer() {

	document.getElementsByClassName("QR_section_container")[0].style.display = "none";
	document.getElementsByClassName("IP_Address_section_container")[0].style.display = "flex";
};

window.onload = function() {

	// setTimeout( function() {
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
	// }, 5000);
}