const fs = require("fs");
const Wiki = require("../models/Wiki");
const Users = require("../models/Users");

module.exports = function (req, res) {
	console.log("gettng one article");
	console.log(req.params);
	let id;
	id = req.params.id;
	// console.log(id);
	let user = res.user;
	console.log(user); // getting the user!
	let context = {};
	let loggedIn = false;
	let loggedInId = " "; // if not logged in, this will be null
	let userName = " ";
	if (user) {
		// if user exists
		loggedIn = true;
		loggedInId = user.id;
		userName = user.username;
	}
	Wiki.findById(id).then((wiki) => {
		// restructuring data for context
		let match = false;
		if (wiki.author == loggedInId) {
			match = true;
		}
		console.log(wiki.description);
		let context = {
			id: wiki._id,
			title: wiki.title,
			description: wiki.description.trim(),
			author: wiki.author,
			created: wiki.created,
			loggedIn: loggedIn, // this was set after checking for user
			match: match,
			loggedInId: loggedInId,
			userName: userName,
			show: "none",
		};
		console.log(context.description);

		res.render("article", context);
	});
};
