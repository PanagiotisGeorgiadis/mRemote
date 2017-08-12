module.exports = class Converters {

	constructor() {
		this.audioFileExtensions = ["au", "awb", "m4a", "m4b", "m4p", "mmf", "mp3", "msv", "ra", "rm", "wav", "wma", "wv", "webm"];
		this.imageFileExtensions = ["tif", "tiff", "gif", "jpeg", "jpg", "jif", "jfif", "jp2", "jpx", "j2k", "j2c", "fpx", "pcd", "png", "svg"];
		this.videoFileExtensions = ["3gp", "avi", "dat", "flv", "fla", "m1v", "m2v", "m4v", "mkv", "mov", "mpeg", "qt", "wmv", "amv", "mp4", "mpg", "mp2", "mpe", "mpv", "f4v", "f4p", "f4a", "f4b"];
		this.archiveFileExtensions = ["7z", "dmg", "gzip", "lz", "rar", "tar", "gz", "zip"];
		this.documentFileExtensions = ["doc", "docx", "odt", "gdoc", "mcw", "pages", "odt"];
		this.presentationFileExtensions = ["gslides", "key", "keynote", "otp", "pps", "ppt", "odt"];
		this.spreadsheetFileExtensions = ["ods", "xls", "xlsx"];

		this.monthAcronyms = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	};

	convertFileExtension(extension) {

		if(extension === "pdf")
				return "PDF Document";

		for(var i = 0; i < this.imageFileExtensions.length; i++) {
			if(extension === this.imageFileExtensions[i])
				return this.imageFileExtensions[i].toUpperCase() + " image";
		}

		for(var i = 0; i < this.videoFileExtensions.length; i++) {
			if(extension === this.videoFileExtensions[i])
				return this.videoFileExtensions[i].toUpperCase() + " video";
		}

		for(var i = 0; i < this.audioFileExtensions.length; i++) {
			if(extension === this.audioFileExtensions[i])
				return this.audioFileExtensions[i].toUpperCase() + " audio";
		}

		for(var i = 0; i < this.archiveFileExtensions.length; i++) {
			if(extension === this.archiveFileExtensions[i])
				return this.archiveFileExtensions[i].toUpperCase() + " archive";
		}

		for(var i = 0; i < this.documentFileExtensions.length; i++) {
			if(extension === this.documentFileExtensions[i])
				return "Word Document";
		}

		for(var i = 0; i < this.presentationFileExtensions.length; i++) {
			if(extension === this.presentationFileExtensions[i])
				return "Presentation Document";
		}

		for(var i = 0; i < this.spreadsheetFileExtensions.length; i++) {
			if(extension === this.spreadsheetFileExtensions[i])
				return "Spreadsheet Document";
		}

		return "File";
	};

	convertDate(dateToConvert) {

		var date = new Date(dateToConvert);

		var day = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
		var month = this.monthAcronyms[date.getMonth()];
		var year = date.getFullYear();
		var hours = (date.getHours() < 10 ) ? "0" + date.getHours() : date.getHours();
		var minutes = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();

		return day + " " + month + " " + year + ", " + hours + ":" + minutes;
	};

	convertFileSize(fileSizeToConvert) {

		var kilobyte = 1000;
		var megabyte = 1000 * 1000;
		var gigabyte = 1000 * 1000 * 1000;
		var terabyte = 1000 * 1000 * 1000 * 1000;

		if ((parseFloat(fileSizeToConvert) / kilobyte) < 1000)
			return parseFloat(fileSizeToConvert / kilobyte).toFixed(1) + " KB";

		else if ((parseFloat(fileSizeToConvert) / megabyte) < 1000)
			return parseFloat(fileSizeToConvert / megabyte).toFixed(1) + " MB";

		else if ((parseFloat(fileSizeToConvert) / gigabyte) < 1000)
			return parseFloat(fileSizeToConvert / gigabyte).toFixed(2) + " GB";

		else if ((parseFloat(fileSizeToConvert) / terabyte) < 1000)
			return parseFloat(fileSizeToConvert / terabyte).toFixed(1) + " TB";
		else
			return "Petabyte?";
	};
}