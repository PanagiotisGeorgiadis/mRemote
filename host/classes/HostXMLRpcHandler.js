const os = require("os");
const fs = require("fs");
const path = require("path");

const pathSeparator = path.sep;

const homeDirectory = os.homedir();
const downloadsFolderPath = homeDirectory + pathSeparator + "Downloads";
// const uploadsFolderPath = downloadsFolderPath + pathSeparator + "uploads";
const uploadsFolderPath = downloadsFolderPath;
// const uploadsFolderPath = downloadsFolderPath + "/uploads/randomDir";

module.exports = class HostXMLRpcHandler {

	constructor() {

		var platform = process.platform; // Possible values: 'darwin' = macOS, 'freebsd' = ?, 'linux' = Ubuntu + ?, 'sunos' = ?, win32 = All Windows.

		console.log(platform);
		this.initialisePlatformSpecificCommands(platform);
	};

	initialisePlatformSpecificCommands(platform) {

		let linuxCommands = {openFolder: "nautilus"};
		let macOSCommands = {openFolder: "open"};
		let windowsCommands = {openFolder: "start"};

		this.systemCommands = {};

		switch(platform) {

			case "darwin":
				this.systemCommands = Object.assign({}, macOSCommands);
				break;
			case "linux":
				this.systemCommands = Object.assign({}, linuxCommands);
				break;
			case "win32":
				this.systemCommands = Object.assign({}, windowsCommands);
				break;
		}
	};

	openUploadsFolder() {

		require("child_process").exec(this.systemCommands.openFolder + " " + uploadsFolderPath);
	};
}