const mongoose = require("mongoose");
const Wiki = require("./Wiki");

const usersSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	articles: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Wiki",
		},
	],
});
module.exports = mongoose.model("Users", usersSchema);
