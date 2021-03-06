const fs = require("fs");
const Wiki = require("../models/Wiki");
const Users = require("../models/Users");

module.exports = function (req, res) {
	console.log("all articles GET");
	let user = res.user;
	let context = {};
	let loggedIn = false;
	let userName = " ";
	if (user) {
		// if user exists
		loggedIn = true;
		userName = user.username;
	}
	Wiki.find({}).then((data) => {
		// data is an array of objects. Objects contain wiki data from wikiSchema
		let wikiArray = data.map((wiki) => {
			// restructuring data for context
			let subArticle = {
				id: wiki._id,
				title: wiki.title,
				description: wiki.description,
				author: wiki.author,
				created: wiki.created,
			};
			return subArticle;
		});
		// console.log(wikiArray);
		let context = {
			data: wikiArray,
			loggedIn: loggedIn, // this was set after checking for user
			userName: userName,
			show: "none",
		};

		res.render("allarticles", context);
	});
};
