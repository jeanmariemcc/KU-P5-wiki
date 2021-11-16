const fs = require("fs");
const Wiki = require("../models/Wiki");
const Users = require("../models/Users");

module.exports = function (req, res) {
	console.log("Editing one article");
	console.log(req.params);
	let id;
	id = req.params.id;
	// console.log(id);
	let user = res.user;
	// console.log(user); // getting the user!
	let context = {};
	let loggedIn = false;
	if (user) {
		// if user exists
		loggedIn = true;
	}
	Wiki.findById(id).then((wiki) => {
		// restructuring data for context

		let context = {
			id: wiki._id,
			title: wiki.title,
			description: wiki.description,
			author: wiki.author,
			created: wiki.created,
			loggedIn: loggedIn, // this was set after checking for user
			userName: user.username,
			show: "none",
		};
		console.log(context);
		res.render("edit", context);
	});
};
