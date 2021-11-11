const fs = require("fs");
const url = require("url");
const path = require("path");

const qs = require("querystring");
const Wiki = require("../models/Wiki");
const Users = require("../models/Users");

module.exports = (req, res) => {
	console.log("Delete get route");
	let id;
	id = req.params.id;
	console.log(id);
	Wiki.findByIdAndRemove(id, function (req, res) {
		console.log(`id ${id} has been deleted`);
	});

	res.redirect("/");
};
