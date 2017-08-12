'use strict';

let io;
const robot = require("robotjs");

module.exports = class SocketConnections {

	constructor(httpServer, hostInfo) {

		this.connections = [];
		this.hostInfo = hostInfo;
		io = require("socket.io")(httpServer);

		io.on("connection", (socket) => {

			setInterval(() => {
				this.checkHostInternetAccess(socket);
			}, 5000);

			socket.on("Device Connected", () => {
				this.deviceConnectedHandler(socket);
			});

			socket.on("Device Disconnected", () => {
				this.deviceDisconnectedHandler(socket);
			});
		});
	};

	checkHostInternetAccess(socket) {
		
		// console.log(this.hostInfo.hasInternetAccess());
		this.hostInfo.hasInternetAccess((internetAccess) => {
			if(internetAccess)
				console.log("Host Is Connected!");
			else
				console.log("No Internet Connection!");
		});
		// if(!this.hostInfo.hasInternetAccess())
			// console.log("HOST Disconnected");
			// socket.broadcast.emit("Host Disconnected!");
	};

	deviceConnectedHandler(socket) {
		
		console.log("A Device Connected!");
		this.connections.push(socket.id);
		// socket.broadcast.emit("Device Connected", {connections: this.connections});
		socket.broadcast.emit("Total Connections", {connections: this.connections});
		console.log(this.connections);
	};

	deviceDisconnectedHandler(socket) {

		console.log("A Device Disconnected!");
		this.connections.splice(this.connections.indexOf(socket.id), 1);
		socket.broadcast.emit("Total Connections", {connections: this.connections});
	};
}