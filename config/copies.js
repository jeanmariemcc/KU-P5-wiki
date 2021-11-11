const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/newTest"); // specify the db to connect to

const userSchema = new mongoose.Schema({
	name: String,
	age: Number,
});
const User = mongoose.model("User", userSchema);

// new User({
// 	name: "John",y

// 	age: "25",
// }).save(function (err, res) {
// 	if (err) {
// 		console.log("error");
// 		console.log(err);
// 	}
// 	console.log(res);
// });
// User.find({}, function (err, res) {
// 	console.log(res);
// });

User.find({}, function (err, res) {
	console.log(res);
	User.findById(res[3]._id, function (err, res) {
		console.log(res);
	});
}); // by nesting the User.find... we are forcing some synchronicity.
// Otherwise if one after the other, the second could conceivably finish before the first.
