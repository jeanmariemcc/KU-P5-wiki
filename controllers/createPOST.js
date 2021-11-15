const fs = require("fs");
const url = require("url");
const path = require("path");
const { validationResult } = require("express-validator");

const qs = require("querystring");
const Wiki = require("../models/Wiki");
const Users = require("../models/Users");

module.exports = (req, res) => {
	console.log("Creating an article");
	let context = {};
	let { errors } = validationResult(req);
	if (errors.length >= 1) {
		if (errors[0].param == "title") {
			context.show = "error";
			context.message = "Title must not be empty.";
		} else {
			context.show = "error";
			context.message = "The description must be at least 20 characters.";
		}
		// console.log(errors);
		return res.render("create", context);
	}

	// TODO
	// validate the info
	//if valid, add to the db
	// otherwise, send error to the front end
	let user = res.user;
	console.log(user); // getting the logged in user!
	let loggedIn = false;
	let loggedInId = ""; // if not logged in, this will be null
	if (user) {
		// if user exists
		loggedIn = true;
		loggedInId = user.id;
	}
	let fields = req.body;
	new Wiki({
		title: fields.title,
		description: fields.description,
		author: loggedInId,
	})
		.save()
		.then((wiki) => {
			console.log(wiki._id, wiki.title);
		});

	//
	res.redirect("/");
	// otherwise send error to the front end
};
