var express = require('express');
var router = express.Router();
// var controllers = require("./controllers");

router.get("/:resource", function(request, response) {

	var resource = request.params.resource;
	response.sendFile(__dirname + "/" + resource + "/index.html");
});

/*router.get("/:resource", function(request, response, next) {

	var resource = request.params.resource;
	var Controller = controllers[resource];

	Controller.find(request.query, function(err, results) {

		if(err) {

			response.status(500).json({
				confirmation: "fail",
				message: err
			});
			return;
		}

		response.status(200).json({
			confirmation: "success",
			message: results
		});
	});
});

router.get("/:resource/:id", function(request, response) {

	var id = request.params.id;
	var resource = request.params.resource;
	var Controller = controllers[resource];

	Controller.findById(id, function(err, result) {

		if(err) {
			response.status(500).json({
				confirmation: "fail",
				message: err
			});
			return;
		}

		response.status(200).json({
			confirmation: "success",
			message: result
		});
		return;
	});
});

router.post("/:resource/", function(request, response) {

	request.on("data", function(data) {

		var jsonObject = JSON.parse(data);
		var resource = request.params.resource;
		var Controller = controllers[resource];

		Controller.create(jsonObject, function(err, result) {

			if(err) {

				response.status(500).send("Some error occured while adding a new category! " + err);
				return;
			}

			response.status(200).send({
				message: "Successfully added new " + resource + " " + result.display_name + "!",
				result
			});
			return;
		});
	});
});

// Here it might need the whole category model.
router.put("/:resource/:id", function(request, response) {

	var id = request.params.id;
	var resource = request.params.resource;
	var Controller = controllers[resource];
	var params = null;

	if(id) {

		Controller.update(id, params, false, function(err, result) {
			console.log(err);
			console.log(result);
			if(err) {

				response.send("An Error Occured While updating the category! " + err);
				return;
			}

			response.send("Successfully Updated the Category!");
			return;
		});
	}
});

router.delete("/:resource/:id", function(request, response) {

	var id = request.params.id;
	var resource = request.params.resource;
	var Controller = controllers[resource];

	if(id)
		Controller.delete(id, function(err, result) {

			if(err) {

				response.send("An Error Occured While Deleting the category! " + err);
				return;
			}

			response.send({
				message: "Successfully Deleted Entry!",
				response: result
			});
			return;
		});
		//category.deleteCategory(id, response);
});*/

module.exports = router;