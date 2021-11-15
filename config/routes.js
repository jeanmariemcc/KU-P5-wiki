//Packages...
const jwt = require("jsonwebtoken");
const { body } = require("express-validator");
const cookieParser = require("cookie-parser");
let bcrypt = require("bcrypt");

//constants
const saltConfig = require("../config/config").saltRounds;
const secret = require("../config/config").jwt.secret;
const jwtOptions = require("../config/config").jwt.options;

// require controllers
const createPOST = require("../controllers/createPOST");
const homeGET = require("../controllers/homeGET");
const allarticlesGET = require("../controllers/allarticlesGET");
const articleGET = require("../controllers/articleGET");
const editGET = require("../controllers/editGET");
const editPOST = require("../controllers/editPOST");
const deleteGET = require("../controllers/deleteGET");
const registerPOST = require("../controllers/registerPOST");
const loginPOST = require("../controllers/loginPOST");
const searchPOST = require("../controllers/searchPOST");

const Wiki = require("../models/Wiki");
const Users = require("../models/Users");

module.exports = (app) => {
	app.use((req, res, next) => {
		// handles create cube and accessory
		// console.log(req.cookies);
		// console.log(`req.cookies.status ${req.cookies.status}`);

		// console.log(secret);
		if (req.cookies.user) {
			let decodedJWT = jwt.verify(req.cookies.user, secret);
			// console.log(decodedJWT);
			res.user = { id: decodedJWT.id, username: decodedJWT.username };
		}
		res.show = "none"; // keeps default for notifications to none

		next();
	});
	app.use("create", (req, res, next) => {
		// handles create cube and accessory
		console.log(req.cookies);
		console.log(secret);

		let decodedJWT = jwt.verify(req.cookies.user, secret);
		console.log(`decoded ${decodedJWT}`);
		// TODO
		// check for user login
		// if logged in, then user authorized for any route
		// else they are limited to home, about, register, and login pages
		next();
	});
	app.use("edit/:id", (req, res, next) => {
		// handles create cube and accessory
		// TODO
		// check for user login
		// if logged in, then user authorized for any route
		// else they are limited to home, about, register, and login pages
		next();
	});
	app.use("delete/:id", (req, res, next) => {
		// handles delete
		// TODO
		// check for user login
		// if logged in, then user authorized for any route
		// else they are limited to home, about, register, and login pages
		next();
	});

	app.get("/", homeGET);

	app.get("/allarticles", allarticlesGET);

	app.get("/article/:id", articleGET);

	app.get("/login", function (req, res) {
		// TODO
		// check if logged in. if in, then redirect back to home
		// checkthe status of the page along with context
		res.render("login");
	});
	app.post("/login", loginPOST);

	app.get("/logout", function (req, res) {
		res.clearCookie("user");
		res.cookie("status", {
			type: "success",
			message: "Log out successful",
		});
		res.redirect("/");
	});

	app.get("/register", function (req, res) {
		let context = {};
		context.show = "none";
		res.render("register", context);
	});
	// app.post("/register", registerPOST);
	app.post(
		"/register",
		body("username").trim().isLength({ min: 5 }).isAlphanumeric(),
		body("password").trim().isLength({ min: 8 }).isAlphanumeric(),
		registerPOST
	);

	// from express js lecture pg 17
	//Custom Middleware for auth here
	app.get("/create", function (req, res) {
		let context = {};
		context.show = "none";
		res.render("create", context);
	});
	app.post(
		"/create",
		body("title").trim().isLength({ min: 1 }),
		body("description").trim().isLength({ min: 20 }),
		createPOST
	);
	// +++++++++++ end create

	app.post("/search", searchPOST);

	app.get("/edit/:id", editGET);
	app.post(
		"/edit/:id",
		body("description").trim().isLength({ min: 20 }),
		editPOST
	);
	// +++++++   end edit

	app.get("/delete/:id", deleteGET);
	// +++++++++++++ end delete
};

// app.get("/test", function (req, res) {
// 	console.log("test");

// 	// Wiki.find({});
// 	// User.findById(res[3]._id, function (err, res) {
// 	// 	console.log(res);
// 	// });
// 	Wiki.find({}).then((data) => console.log(data));
// 	// 	.catch((err) => console.log(err));

// 	res.render("login");
// });
// });
