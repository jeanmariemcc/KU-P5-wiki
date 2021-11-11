const fs = require("fs");

module.exports = function (req, res) {
	fs.readFile("./config/dataArticles.json", "utf8", (err, data) => {
		if (err) throw err;
		let articles = JSON.parse(data);

		// console.log(articles);
		// TODO need to limit articles array to three most recent
		// TODO need to limit description to 50 characters
		let context = {
			articles,
		};
		res.render("index", context);
	});
};
