let bcrypt = require("bcrypt");
const saltConfig = require("../config/config").saltRounds;
const Users = require("../models/Users");
const { validationResult } = require("express-validator");
// • Username
//    Done  Should be unique (add "unique: true" property to each User Model username)
//     Should consist only with English letters and digits
//     Should be at least 5 characters long
// • Password
//     Should consist only with English letters and digits
//     Should be at least 8 characters long
// • Re-Password - (only in Register Page)
//     Should be the same as the given password

module.exports = (req, res) => {
	console.log(req.body);
	let username = req.body.username;
	let password = req.body.password;
	let repeatPassword = req.body.repeatPassword;
	let context = {};
	context.username = username;
	context.password = password;
	context.repeatPassword = repeatPassword;
	//TODO make sure the user have a unique username
	let { errors } = validationResult(req);
	console.log(errors);
	if (errors.length >= 1) {
		if (errors[0].param == "username") {
			context.show = "error";
			context.message =
				"Please make sure your username is at least 5 characters long, and only contains letters and numbers.";
		} else {
			context.show = "error";
			context.message =
				"Please make sure your password is at least 8 characters long, and only contains letters and numbers.";
		}
		// console.log(errors);
		return res.render("register", context);
	}

	// if username and password are correct lenght and type
	// check if username is unique
	if (password == repeatPassword) {
		// TODO regex check for valid password
		// encrypt
		bcrypt.genSalt(saltConfig, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				console.log(hash);
				//create a new user in the db
				let articleArray = [];
				new Users({
					username,
					password: hash,
					articles: articleArray,
				})
					.save()
					.then((user) => {
						res.status(201);
						console.log(`User was created successfully!`);
						console.log(user);
						res.cookie("status", {
							show: "success",
							message: "User created!",
						});
						let context = {};
						context.show = "success";
						context.message =
							"User successfully created, please login";
						res.render("login", context);
						//res.end();
					})
					.catch((err) => {
						console.log(err);
					});
			});
		});
		//if valid add user to database
	} else {
		console.log("Passwords do not match");
		let context = {};
		context.show = "error";
		context.message = "Passwords do not match";
		context.username = username;
		context.password = password;
		context.repeatPassword = repeatPassword;
		res.render("register", context);
		// send error back to front end
	}
};
