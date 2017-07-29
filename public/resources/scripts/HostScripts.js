class HostScripts {

	constructor() {

		this.serverInfo = null;
	};

	getServerInfo() {

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
	};

	showLoadingImage() {

		document.getElementsByClassName("loading_image_container")[0].style.display = "flex";
	};

	hideLoadingImage() {

		document.getElementsByClassName("loading_image_container")[0].style.display = "none";
	};

	drawIpAddress() {

		var IP_Address_element = document.getElementsByClassName("IP_Address_element")[0];
		IP_Address_element.innerHTML = this.serverInfo.serverIpAddress;
	};

	drawQRCodeImage() {

		var QR_code_image = document.getElementsByClassName("QR_code_image")[0];
		QR_code_image.src = this.serverInfo.QRCodeImageSource;
	};

	drawServerInfo(serverInfo) {

		this.serverInfo = serverInfo;
		var content_container = document.getElementsByClassName("content_container")[0];

		this.drawQRCodeImage();
		this.drawIpAddress();
		// showQRSectionContainer();

		content_container.style.display = "flex";
	};
}
