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

var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var robot = require("robotjs");


var NetworkClients = require("./host/classes/NetworkClients");
var network = new NetworkClients();

// app.use(adminApp.use("/styles", express.static(__dirname + "/public/styles/"));)
// app.use("/gamecubeStatic", express.static(__dirname + "./remotes/gamecube/"));
// adminApp.use("/api", require(__dirname + "/_api/api_router.js"));

const resourcesFolderPath = __dirname + "/public/resources";
const remotesFolderPath = __dirname + "/public/resources/remotes";

app.use("/remotes", require(remotesFolderPath + "/remotes_router.js"));

app.use("/styles", express.static(resourcesFolderPath + "/styles/"));
app.use("/scripts", express.static(resourcesFolderPath + "/scripts/"));
app.use("/images", express.static(resourcesFolderPath + "/images/"));

app.use("/fonts/Carter_One", express.static(resourcesFolderPath + "/fonts/Carter_One/"));
app.use("/fonts/Kurale", express.static(resourcesFolderPath + "/fonts/Kurale/"));

app.use("/gamecubeStatic", express.static(remotesFolderPath	+ "/gamecube/"));
app.use("/nesStatic", express.static(remotesFolderPath		+ "/nes/"));
app.use("/ps1Static", express.static(remotesFolderPath		+ "/ps1/"));
app.use("/ps2Static", express.static(remotesFolderPath		+ "/ps2/"));
app.use("/ps3Static", express.static(remotesFolderPath		+ "/ps3/"));
app.use("/ps4Static", express.static(remotesFolderPath		+ "/ps4/"));
app.use("/snesStatic", express.static(remotesFolderPath		+ "/snes/"));
app.use("/snesStatic2", express.static(remotesFolderPath	+ "/snes2/"));

var connections = [];
app.get("/", function(request, response) {
	response.sendFile(resourcesFolderPath + "/pages/landing_page/");
});

app.get("/connect", (request, response) => {
	response.sendFile(resourcesFolderPath + "/pages/connection_page/");
});

app.get("/serverInfo", network.getServerInfo.bind(network));

app.get("/noSocket", function(request, response) {


	response.send("HALLO");
});

/*app.get("/serverInfo", function(request, response) {

	var NetworkClients = require("./classes/NetworkClients");
	var network = new NetworkClients();

	response.send({
		ipAddress: network.getHostIpAddress()
	});
});*/


/*app.get("/command", function(request, response) {


	// robot.setKeyboardDelay(3000);
	console.log(request);
});*/

var connections = [];
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
});


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
