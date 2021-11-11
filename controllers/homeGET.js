const fs = require("fs");
const Wiki = require("../models/Wiki");
const Users = require("../models/Users");

module.exports = function (req, res) {
	console.log("homeGET");
	Wiki.find({}).then((data) => {
		// data is an array of objects. Objects contain wiki data from wikiSchema
		let wikiArray = data.map((wiki) => {
			// restructuring data for context
			let shortDesc = wiki.description.split(" ").splice(0, 50).join(" ");
			shortDesc = shortDesc + " ...";
			let subArticle = {
				id: wiki._id,
				title: wiki.title,
				description: shortDesc,
				author: wiki.author,
				created: wiki.created,
			};
			return subArticle;
		});
		let start = wikiArray.length - 3;
		wikiArray = wikiArray.slice(start, wikiArray.length);
		// console.log(wikiArray);
		let context = {
			data: wikiArray,
		};

		res.render("index", context);
	});
};
// let wikiArray = wiki.map((mywiki) => {
// 	let subWiki = {
// 		id: mywiki._id,
// 		title: mywiki.title,
// 		description: mywiki.description,
// 		author: mywiki.author,
// 		created: mywiki.created,
// 	};
// 	return subWiki;
// });
// console.log(wikiArray);
// let context = {
// 	wiki: wikiArray,
// };
