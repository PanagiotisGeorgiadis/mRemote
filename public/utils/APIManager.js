export default {

	get: (url) => {

		return new Promise((resolve, reject) => {

			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {

				if(xhr.readyState === 4) {

					if(xhr.status === 200)
						resolve(JSON.parse(xhr.responseText));
					else
						reject("Response status " + xhr.status);
				}
			}

			xhr.onerror = function(error) {

				if(xhr.status == 0)
					reject(error);
				else
					reject(error);
			}

			xhr.open("GET", url, true);
			xhr.send();
		});
	},
}