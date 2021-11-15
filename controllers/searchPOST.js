const fs = require("fs");
const url = require("url");
const path = require("path");

const qs = require("querystring");
const Wiki = require("../models/Wiki");
const Users = require("../models/Users");

module.exports = (req, res) => {
	console.log("Searching for an article");
	let fields = req.body;
	console.log(fields);
	let search = fields.search;
	console.log(search);
	let user = res.user;
	console.log(user); // getting the user!
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
		let matchArray = [];
		for (let i = 0; i < wikiArray.length; i++) {
			let string = wikiArray[i].title;
			if (string.includes(search)) {
				matchArray.push(wikiArray[i]);
			}
			// if(wikiArray[i].title)
		}
		// console.log(wikiArray);
		let context = {
			data: matchArray,
			loggedIn: loggedIn, // this was set after checking for user
			userName: userName,
			show: "none",
		};

		res.render("search", context);
	});
};
