const fs = require("fs");
const url = require("url");
const path = require("path");

const qs = require("querystring");
const Wiki = require("../models/Wiki");
const Users = require("../models/Users");

module.exports = (req, res) => {
	console.log("Editing an article");
	// TODO
	// validate the info
	//if valid, add to the db
	// otherwise, send error to the front end
	let id;
	id = req.params.id;
	// console.log(id);
	let fields = req.body;
	console.log(fields);
	let descriptionIn = fields.description;

	Wiki.findById(id).then((article) => {
		console.log(article.description);
		article.description = descriptionIn;
		article.save();
	});

	// new Wiki({
	// 	title: fields.title,
	// 	description: fields.description,
	// 	author: "jm1",
	// })
	// 	.save()
	// 	.then((wiki) => {
	// 		console.log(wiki._id, wiki.title);
	// 	});

	//
	res.redirect("/");
	// otherwise send error to the front end
};
