const mongoose = require("mongoose");
const Users = require("./Users");

const wikiSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	author: { type: String, default: "jm1", required: true },
	created: { type: Date, default: Date.now, required: true },
});
module.exports = mongoose.model("Wiki", wikiSchema);
