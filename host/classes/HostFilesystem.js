const os = require("os");
const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

const Converters = require("../utils/Converters");
const converters = new Converters();
const pathSeparator = path.sep;

const homeDirectory = os.homedir();
const downloadsFolderPath = homeDirectory + pathSeparator + "Downloads";
// const uploadsFolderPath = downloadsFolderPath + pathSeparator + "uploads";
const uploadsFolderPath = downloadsFolderPath;
// const uploadsFolderPath = downloadsFolderPath + "/uploads/randomDir";

// console.log(os.cpus()[0].model.split(" CPU")[0]);
// console.log(os.cpus()[0].speed);
// console.log(os.cpus().length);
// console.log(os.arch());
// console.log("============================================");
// console.log(os.networkInterfaces());
// console.log(os.hostname());
// console.log(os.platform());

module.exports = class HostFilesystem {
	
	constructor() {
	};

	getUserUploads(callback, iterator = 0) {

		if(!callback)
			return;

		fs.readdir(uploadsFolderPath, (err, files) => {

			if(iterator > 10)
				return;

			if(err) {
				fs.mkdirSync(uploadsFolderPath);
				this.getUserUploads(callback, iterator++);
				return;
			}
			
			let responseArray = [];
			files.map((file, iterator) => {

				var responseObject = {};
				responseObject.name = file;
				responseObject.extension = this.getFileExtension(file);
				responseObject.type = this.getFileType(responseObject.extension);
				responseObject.size = this.getFileSize(file);
				responseObject.createDate = this.getCreationTime(file);

				responseArray.push(responseObject);
			});
			callback({files: responseArray});
		});
	};

	getFileExtension(file) {

		if(fs.statSync(uploadsFolderPath + pathSeparator + file).isDirectory())
			return "folder";
		else if(fs.statSync(uploadsFolderPath + pathSeparator + file).isFile())
			return file.split(".")[file.split(".").length - 1];
	};

	getFileSize(file) {
		return converters.convertFileSize(fs.statSync(uploadsFolderPath + pathSeparator + file).size);
	};

	getFileType(extension) {

		if(extension === "Folder")
			return "Folder";
		else
			return converters.convertFileExtension(extension);
	};

	getCreationTime(file) {
		return converters.convertDate(fs.statSync(uploadsFolderPath + pathSeparator + file).birthtime);
	};

	handleFileUploads(request, response) {

		var form = new formidable.IncomingForm();
		form.multiples = true;
		form.uploadDir = uploadsFolderPath;

		form.on("file", (field, file) => {

			if(fs.existsSync(path.join(form.uploadDir, file.name))) {
				
				var iterator = 1;

				while(fs.existsSync(path.join(form.uploadDir, file.name + " (" + iterator + ")"))) {
					iterator++;
				}

				fs.rename(file.path, path.join(form.uploadDir, file.name + " (" + iterator + ")"));
			
			} else {

				fs.rename(file.path, path.join(form.uploadDir, file.name));
			}
		});

		form.on("error", (error) => {
			console.log("Some Error Occured!");
			console.log(error);
			response.send({error});
		});

		form.on("end", () => {
			console.log("Success!");
			response.send({message: "Success"});	
		});

		form.parse(request);
	}
}