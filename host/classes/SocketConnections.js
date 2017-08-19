'use strict';

let io;
const robot = require("robotjs");

module.exports = class SocketConnections {

	constructor(httpServer, hostInfo) {

		this.connections = [];
		this.connectedDevices = [];
		this.hostSocket = null;
		this.hostInfo = hostInfo;

		io = require("socket.io")(httpServer);

		// Search on which event to actually listen on.
		// io.on("connect", (socket) => {
		// 	console.log("Host connect event fired!");
		// 	console.log(socket);
		// });

		io.on("connection", (socket) => {

			setInterval(() => {
				this.checkHostInternetAccess(socket);
			}, 5000);

			/*console.log("======================================");
			console.log("Socket.handshake");
			console.log(socket.handshake);
			console.log("======================================");*/

			socket.on("Host/Connection", () => {
				this.hostConnectedHandler(socket);
				this.hostConnectionStatusHandler(socket);
			});

			socket.on("Host/Disconnect", () => {
				this.hostDisconnectedHandler(socket);
				this.hostConnectionStatusHandler(socket);
			});

			socket.on("Host/Connection/Status", () => {
				this.hostConnectionStatusHandler(socket);
			});

			socket.on("Device/Connection", (deviceInfo) => {
				this.deviceConnectedHandler(socket, deviceInfo);
			});

			socket.on("Device/Disconnect", () => {
				this.deviceDisconnectedHandler(socket);
			});

			socket.on("Get/Connected_Devices", () => {
				this.getConnectedDevicesHandler(socket);
			});

		});
	};

	hostConnectedHandler(socket) {
		this.hostSocket = socket;
	};

	hostDisconnectedHandler(socket) {
		this.hostSocket = null;
	};

	hostConnectionStatusHandler(socket) {
		if(this.hostSocket)
			socket.broadcast.emit("Host/Connection/Success");
		else
			socket.broadcast.emit("Host/Connection/Failure");
	};

	checkHostInternetAccess(socket) {
		this.hostInfo.hasInternetAccess((internetAccess) => {
			if(internetAccess)
				socket.broadcast.emit("Host/Connection/Success");
			else
				socket.broadcast.emit("Host/Connection/Failure");

			socket.emit("Host/Internet/Access", {internetAccess});
		});
	};

	getConnectedDeviceIndex(socketId) {
		for(var i = 0; i < this.connectedDevices.length; i++) {
			if(this.connectedDevices[i].socketId === socketId)
				return i;
		}
		return -1;
	}

	deviceConnectedHandler(socket, deviceInfo) {
		if(this.getConnectedDeviceIndex() === -1) {
			this.connectedDevices.push(Object.assign({socketId: socket.id}, deviceInfo));
			socket.broadcast.emit("Device/Connection/Success", this.connectedDevices[this.connectedDevices.length - 1]);
		}
	};

	deviceDisconnectedHandler(socket) {
		var deviceIndex = this.getConnectedDeviceIndex(socket.id);
		if(deviceIndex >= 0) {
			socket.broadcast.emit("Device/Connection/Failure", this.connectedDevices.splice(deviceIndex, 1)[0]);
		}
	};

	getConnectedDevicesHandler(socket) {
		socket.emit("Host/Connected_Devices", this.connectedDevices);
	};
}