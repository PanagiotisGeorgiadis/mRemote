'use strict';

const os = require('os');
const dns = require("dns");
const QRCode = require("qrcode");
const Validators = require("../utils/Validators");
const validators = new Validators();

module.exports = class HostInfo {

	constructor() {
	};

	getHostIpAddress(request, response) {

		let serverIpAddress = (validators.ValidateIpAddress(this.scanHostNetworkInterface())) ? this.scanHostNetworkInterface() : null;
		var QRCodeImageSource = null;

		if(serverIpAddress) {
			new Promise(function(resolve, reject) {

				QRCode.toDataURL("http://" + serverIpAddress, {version: 5}, function(err, url) {
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
			});
		}
	};

	scanHostNetworkInterface() {

		var serverIpAddress = null;
		var ifaces = os.networkInterfaces();
		Object.keys(ifaces).forEach(function (ifname) {

			var alias = 0;
			ifaces[ifname].forEach(function (iface) {

				// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
				if ('IPv4' !== iface.family || iface.internal !== false)
					return;

				if (alias >= 1) // this single interface has multiple ipv4 addresses
					serverIpAddress.push(iface.address);
				else // this interface has only one ipv4 adress
					serverIpAddress = iface.address;

				++alias;
			});
		});

		return serverIpAddress;
	};

	hasInternetAccess(callback) {

		dns.lookup("google.com", (err) => {
			if(err && ( err.code === "ENOTFOUND" || err.code === "EAI_AGAIN"))
				callback(false);
			else
				callback(true);
		});
	};

} // End of HostInfo class.
