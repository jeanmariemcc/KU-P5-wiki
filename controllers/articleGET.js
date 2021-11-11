const fs = require("fs");
const Wiki = require("../models/Wiki");
const Users = require("../models/Users");

module.exports = function (req, res) {
	console.log("gettng one article");
	console.log(req.params);
	let id;
	id = req.params.id;
	// console.log(id);

	Wiki.findById(id).then((wiki) => {
		// restructuring data for context

		let context = {
			id: wiki._id,
			title: wiki.title,
			description: wiki.description,
			author: wiki.author,
			created: wiki.created,
		};

		res.render("article", context);
	});
};
