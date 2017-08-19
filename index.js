'use strict';
/* This is a working sample of the code that finds the available IP Addresses in the network and then cross references with arp in order to get the Mac Addresses.
var util = require("util");
var exec = require("child_process").exec;

var NetworkClients = require("./classes/NetworkClients");
var network = new NetworkClients();

network.scanNetwork();
*/

console.log("==========================================");
console.log("\n\n\n\n");
console.log("==========================================");

const express = require("express");
const app = express();
const http = require("http").Server(app);

const pathSeparator = require("path").sep;
const resourcesFolderPath = __dirname + pathSeparator + "public" + pathSeparator + "resources";
const hostClassesFolderPath = __dirname + pathSeparator + "host" + pathSeparator + "classes";

const HostInfo = require(hostClassesFolderPath + pathSeparator + "HostInfo");
const HostFilesystem = require(hostClassesFolderPath + pathSeparator + "HostFilesystem");
const SocketConnections = require(hostClassesFolderPath + pathSeparator + "SocketConnections");
const HostXMLRpcHandler = require(hostClassesFolderPath + pathSeparator + "HostXMLRpcHandler");

const hostInfo = new HostInfo();
const hostFilesystem = new HostFilesystem();
const socketConnection = new SocketConnections(http, hostInfo);
const hostXMLRpcHandler = new HostXMLRpcHandler();

app.use("/app", express.static(__dirname + pathSeparator + "public"));
app.use("/styles", express.static(resourcesFolderPath + pathSeparator + "styles"));
app.use("/scripts", express.static(resourcesFolderPath + pathSeparator + "scripts"));
app.use("/images", express.static(resourcesFolderPath + pathSeparator + "images"));


app.use("/fonts/Carter_One", express.static(resourcesFolderPath + pathSeparator + "fonts" + pathSeparator + "Carter_One"));
app.use("/fonts/Kurale", express.static(resourcesFolderPath + pathSeparator + "fonts" + pathSeparator + "Kurale"));

// const remotesFolderPath = __dirname + "/public/resources/remotes";

// app.use("/remotes", require(remotesFolderPath + "/remotes_router.js"));
// app.use("/gamecubeStatic", express.static(remotesFolderPath	+ "/gamecube/"));
// app.use("/nesStatic", express.static(remotesFolderPath		+ "/nes/"));
// app.use("/ps1Static", express.static(remotesFolderPath		+ "/ps1/"));
// app.use("/ps2Static", express.static(remotesFolderPath		+ "/ps2/"));
// app.use("/ps3Static", express.static(remotesFolderPath		+ "/ps3/"));
// app.use("/ps4Static", express.static(remotesFolderPath		+ "/ps4/"));
// app.use("/snesStatic", express.static(remotesFolderPath		+ "/snes/"));
// app.use("/snesStatic2", express.static(remotesFolderPath	+ "/snes2/"));

app.get("/", function(request, response) {
	// console.log(request.headers);
	response.sendFile(resourcesFolderPath + pathSeparator + "pages" + pathSeparator);
});

app.get("/connected_devices", function(request, response) {
	response.sendFile(resourcesFolderPath + pathSeparator + "pages" + pathSeparator);
});

app.get("/serverInfo", hostInfo.getHostIpAddress.bind(hostInfo));

app.get("/uploads", (request, response) => {

	hostFilesystem.getUserUploads((data) => {
		response.send(data);
	});
});

app.post("/uploads", (request, response) => {
	// TODO: Uploads from the user to the host.
	hostFilesystem.handleFileUploads(request, response);
});

app.post("/host/openUploads", (request, response) => {
	hostXMLRpcHandler.openUploadsFolder();
	response.send({message: "Command Received"});
});


// Test paths.
app.get("/test", function(request, response) {
	response.sendFile(resourcesFolderPath + pathSeparator + "pages" + pathSeparator + "test_page" + pathSeparator);
});

app.get("/landing_page", function(request, response) {
	response.sendFile(resourcesFolderPath + pathSeparator + "pages" + pathSeparator + "landing_page" + pathSeparator);
});

app.get("/upload_test", function(request, response) {
	response.sendFile(resourcesFolderPath + pathSeparator + "pages" + pathSeparator + "upload_test" + pathSeparator);
});

app.get("/connected_devices_test", function(request, response) {
	response.sendFile(resourcesFolderPath + pathSeparator + "pages" + pathSeparator + "connected_devices" + pathSeparator);
});

app.get("/connect", (request, response) => {
	response.sendFile(resourcesFolderPath + pathSeparator + "pages" + pathSeparator + "connection_page" + pathSeparator);
});

app.get("/noSocket", function(request, response) {
	response.send("HALLO");
});

app.get("/client_test", function(request, response) {
	response.sendFile(resourcesFolderPath + pathSeparator + "pages" + pathSeparator + "client_test" + pathSeparator);
});

/*app.get("/command", function(request, response) {


	// robot.setKeyboardDelay(3000);
	console.log(request);
});*/

/*var connections = [];
io.on("connection", function(socket) {

	// console.log(socket);

	socket.on("Connection Success", function() {

		console.log("A user connected!");
		connections.push(socket.id);
		socket.broadcast.emit("Device Connected", {connections});
	});

	socket.on("Connection Terminated", function() {

		console.log("A user disconnected!");
		connections.splice(connections.indexOf(socket.id), 1);
		socket.broadcast.emit("Device Disconnected", {connections});
	});


	// socket.emit("Connection Success", {connectionStatus: "Success", total_connections: connections.length});

	// socket.on("disconnect", function(data) {

	// 	console.log("User Disconnected!");
	// 	connections.splice(connections.indexOf(socket), 1);
	// 	socket.emit("Disconnected :", {total_connections: connections.length})
	// });

	// socket.on("Disconnected", function(data) {
	// 	socket.broadcast.emit("Device Disconnected");
	// });
	//
	// socket.on("Send Command", function(data) {
	// 	console.log(data);
	// });
	//
	// socket.broadcast.emit("Device Connected");

	// setTimeout(() => {
	// 	robot.typeString("Eminem Full Album The Eminem Show");
	// 	robot.keyTap("enter");
	// }, 5000);

	// setTimeout(() => {

	// 	var screenSize = robot.getScreenSize();
	// 	var height = (screenSize.height * 0.4) - 10;
	// 	var width = screenSize.width * 0.4;

	// 	robot.moveMouse(width, height);

	// 	// robot.keyTap("f");
	// 	robot.keyTap("audio_mute");
	// }, 15000);

	// setTimeout(() => {
	// 	robot.keyTap("audio_mute");
	// }, 17500);
}); */


// http.listen(80);
http.listen(3000, function() {
	console.log("Listening on port 3000");
});

// app.listen(3000);

// 1) Do ifconfig or ipconfig /all in order to get the default gateway.
// 2) Do ping all the clients or an ip range on the selected network.
// 3a) Do an ARP to see if they have a mac address. (As I remember from work the mobile devices dont have a mac address.)
// 3b) The command could be arp -a in order to avoid all the pings in between.

// child = exec("arp -a", (error, stdout, stderr, filepath, workingDirectory) => {

// 	if(stdout)
// 		if(!stdout.includes("(incomplete)"))
// 			console.log(stdout);
// });

// The End!!
