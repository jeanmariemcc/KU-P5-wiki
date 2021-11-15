let bcrypt = require("bcrypt");
const saltConfig = require("../config/config").saltRounds;
const secret = require("../config/config").jwt.secret;
const jwtOptions = require("../config/config").jwt.options;

const Users = require("../models/Users");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
	console.log(req.body);
	let username = req.body.username;
	let password = req.body.password;

	Users.findOne({ username })
		.then((user) => {
			if (user !== null) {
				// compare password entered with one in database
				console.log(user);
				bcrypt.compare(password, user.password, (err, result) => {
					console.log(result);

					if (result) {
						res.status(200);
						//move to the home page
						//create a json webtoken, send it as a cookie for the other routes
						let userToken = {
							id: user._id,
							username: user.username,
						};
						const token = jwt.sign(userToken, secret, jwtOptions);
						console.log(token);
						res.cookie("user", token);
						res.redirect("/");
					} else {
						res.status(406); // bad password
						console.log("Bad password");
						let context = {};
						context.show = "warning";
						context.message = "Bad password";
						context.username = username;
						context.password = password;
						res.render("login", context);
						// rerender with info to show what is wrong
					}
				});
			} else {
				res.status(406); // bad username
				console.log("Bad username");
				let context = {};
				context.show = "warning";
				context.message = "Bad username";
				context.username = username;
				context.password = password;
				res.render("login", context);
			}
		})
		.catch((err) => {
			console.log(err);
		});
};
