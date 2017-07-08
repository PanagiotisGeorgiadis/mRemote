'use strict';

var child;
var os = require('os');
var util = require("util");
var exec = require("child_process").exec;
var QRCode = require("qrcode");

module.exports = class NetworkClients {

	constructor() {

		this.networkClients = [];
	};

	getServerInfo(request, response) {

		// this.scanNetwork();	// I dont know if we should use that or not.
		let serverIpAddress = (this.ValidateIpAddress(this.getHostIpAddress())) ? this.getHostIpAddress() : null;
		var QRCodeImageSource = null;

		new Promise(function(resolve, reject) {

			QRCode.toDataURL("http://" + serverIpAddress, {version: 5}, function(err, url) {
				// console.log(url);
				QRCodeImageSource = url;
				resolve();
			});
		})
		.then(function(promiseResponse) {

			response.send({
				message: "Hello",
				serverIpAddress,
				QRCodeImageSource,
			});
		})
		.catch(function(promiseError) {

		});
	};

	getHostIpAddress() {

		var serverIpAddress = null;
		var ifaces = os.networkInterfaces();
		Object.keys(ifaces).forEach(function (ifname) {

			var alias = 0;
			ifaces[ifname].forEach(function (iface) {

				// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
				if ('IPv4' !== iface.family || iface.internal !== false)
					return;

				if (alias >= 1) { // this single interface has multiple ipv4 addresses

					// console.log(ifname + ':' + alias, iface.address);
					serverIpAddress.push(iface.address);
				} else { // this interface has only one ipv4 adress

					// console.log(ifname, iface.address);
					serverIpAddress = iface.address;
				}
				++alias;
			});
		});

		return serverIpAddress;
	};

	ValidateIpAddress(ipAddress) {
	
		if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {  
			return true;
		}
		return false;
	};

	ValidateMacAddress(macAddress) {

		if(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(macAddress))
			return true;

		return false;
	};

	FillMacAddress(macAddress) {

		if(macAddress.indexOf(":") !== 2)
			macAddress = "0" + macAddress;

		if(macAddress.indexOf(":", 3) !== 5)
			macAddress = macAddress.slice(0, 3) + "0" + macAddress.slice(3, macAddress.length); 

		if(macAddress.indexOf(":", 6) !== 8)
			macAddress = macAddress.slice(0, 6) + "0" + macAddress.slice(6, macAddress.length);

		if(macAddress.indexOf(":", 9) !== 11)
			macAddress = macAddress.slice(0, 9) + "0" + macAddress.slice(9, macAddress.length);

		if(macAddress.indexOf(":", 12) !== 14)
			macAddress = macAddress.slice(0, 12) + "0" + macAddress.slice(12, macAddress.length);

		if(macAddress.length > 17)
			macAddress = macAddress.trim();

		return macAddress;
	};
	
	scanNetwork() {

		for(var i = 0; i < 256; i++) {

			new Promise((resolve, reject) => {

				child = exec("ping -c 5 192.168.0." + i, { timeout: 1000 }, (error, stdout, stderr, filepath, workingDirectory) => {

					if(stdout) {
						if(!stdout.includes("Request timeout")) {

							let first_parenthesis_index = stdout.indexOf("(");
							let second_parenthesis_index = stdout.indexOf(")");
							let ipAddress = stdout.slice(first_parenthesis_index + 1, second_parenthesis_index);

							if(this.ValidateIpAddress(ipAddress))
								this.networkClients.push({ipAddress})

							resolve(ipAddress);

						} else {
							return;
						}
					}
				});
				
			}).then((ipAddress) => {
				
				child = exec("arp " + ipAddress, (error, stdout, stderr, filepath, workingDirectory) => {

					if(stdout) {

						if(!stdout.includes("(incomplete)")) {
							
							let first_colon_index = stdout.indexOf(":");
							let macAddress = stdout.slice(first_colon_index - 2, first_colon_index + 15);

							macAddress = this.FillMacAddress(macAddress);
							if(this.ValidateMacAddress(macAddress)) {

								for(var i = 0; i < this.networkClients.length; i++) {

									if(this.networkClients[i].ipAddress === ipAddress)
										this.networkClients[i].macAddress = macAddress;
								}
							}
						}

					}
				});

			}).catch((error) => {

				console.log("Some error occured while scanning the network!");
				console.error(error);
			})
		}
	};

} // End of Network class.






