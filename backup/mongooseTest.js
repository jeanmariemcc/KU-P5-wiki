const mongoose = require("mongoose");
const Wikii = require("../models/Wiki");
const wikiiSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	author: { type: String, default: "jm1", required: true },
	created: { type: Date, default: Date.now, required: true },
});
module.exports = mongoose.model("Wikii", wikiiSchema);

mongoose.connect("mongodb://localhost:27017/wiki").then(function () {
	new Wikii({
		title: "inserted2",
		description: "inserted from test code",
		author: "jm1",
		created: 123456789,
	})
		.save()
		.then((wikin) => {
			console.log(wikin._id);
		})
		.catch((err) => {
			console.log(err);
		});

	// Wiki.find({}).then((data) => console.log(data));
});

// Wiki.find({}).then((data) => console.log(data));
//
