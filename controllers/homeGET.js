const fs = require("fs");
const querystring = require("querystring");
const Wiki = require("../models/Wiki");
const Users = require("../models/Users");
const { body, validationResult } = require("express-validator");

module.exports = function (req, res) {
	console.log("homeGET");
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
			let shortDesc = wiki.description.split(" ").splice(0, 50).join(" ");
			shortDesc = shortDesc + " ...";
			let subArticle = {
				id: wiki._id,
				title: wiki.title,
				description: shortDesc,
				author: wiki.author,
				created: wiki.created,
			};
			return subArticle;
		});
		let start = 0;
		if (wikiArray.length > 3) {
			start = wikiArray.length - 3; // if array is longer than 3, slice off the oldest articles and leave the last 3
		}
		wikiArray = wikiArray.slice(start, wikiArray.length);
		// console.log(wikiArray);
		// if (loggedIn == true) {
		context = {
			data: wikiArray,
			loggedIn: loggedIn, // this was set after checking for user
			userName: userName,
			message: "Success",
			show: "none",
		};

		res.render("index", context);
	});
};
// let wikiArray = wiki.map((mywiki) => {
// 	let subWiki = {
// 		id: mywiki._id,
// 		title: mywiki.title,
// 		description: mywiki.description,
// 		author: mywiki.author,
// 		created: mywiki.created,
// 	};
// 	return subWiki;
// });
// console.log(wikiArray);
// let context = {
// 	wiki: wikiArray,
// };
