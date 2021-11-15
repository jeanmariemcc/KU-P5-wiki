const fs = require("fs");
const url = require("url");
const path = require("path");
const { validationResult } = require("express-validator");

const qs = require("querystring");
const Wiki = require("../models/Wiki");
const Users = require("../models/Users");

module.exports = (req, res) => {
	console.log("Editing an article");
	// validate the info
	let context = {};
	let title = req.body.title;
	let description = req.body.description;

	// let { errors } = validationResult(req);
	// if (errors.length >= 1) {
	// 	context.title = title;
	// 	context.description = description;
	// 	context.show = "error";
	// 	context.message = "The description must be at least 20 characters.";
	// 	return;
	// }
	//if valid, add to the db

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
