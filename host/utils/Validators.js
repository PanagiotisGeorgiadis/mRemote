module.exports = class Validators {

	ValidateIpAddress(ipAddress) {

		if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress)) {  
			return true;
		}
		return false;
	};

	ValidateMacAddress(macAddress) {

		if(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(macAddress)) {
			return true;
		}

		return false;
	};
}