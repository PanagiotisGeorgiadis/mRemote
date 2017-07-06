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

// app.use(adminApp.use("/styles", express.static(__dirname + "/public/styles/"));)
// app.use("/gamecubeStatic", express.static(__dirname + "./remotes/gamecube/"));
// adminApp.use("/api", require(__dirname + "/_api/api_router.js"));

app.use("/remotes", require(__dirname + "/remotes/remotes_router.js"));

app.use("/styles", express.static(__dirname + "/shared_styles/"));
app.use("/scripts", express.static(__dirname + "/shared_scripts/"));
app.use("/images", express.static(__dirname + "/images/"));

app.use("/gamecubeStatic", express.static(__dirname + "/remotes/gamecube/"));
app.use("/nesStatic", express.static(__dirname + "/remotes/nes/"));
app.use("/ps1Static", express.static(__dirname + "/remotes/ps1/"));
app.use("/ps2Static", express.static(__dirname + "/remotes/ps2/"));
app.use("/ps3Static", express.static(__dirname + "/remotes/ps3/"));
app.use("/ps4Static", express.static(__dirname + "/remotes/ps4/"));
app.use("/snesStatic", express.static(__dirname + "/remotes/snes/"));
app.use("/snesStatic2", express.static(__dirname + "/remotes/snes2/"));


app.get("/", function(request, response) {

	response.sendFile(__dirname + "/pages/index.html");
});


/*app.get("/command", function(request, response) {


	// robot.setKeyboardDelay(3000);
	console.log(request);
});*/


var connections = [];
io.on("connection", function(socket) {

	// console.log(socket);
	console.log("A user connected!");
	
	connections.push(socket);
	socket.emit("Connection Success", {connectionStatus: "Success", total_connections: connections.length});

	socket.on("disconnect", function(data) {

		console.log("User Disconnected!");
		connections.splice(connections.indexOf(socket), 1);
		socket.emit("Disconnected :", {total_connections: connections.length})
	});

	socket.on("Send Command", function(data) {
		console.log(data);
	});
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





















