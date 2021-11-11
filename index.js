// TODO: this was copied from cubicles
const env = process.env.NODE_ENV || "development";
// const path = require("path");

// const express = require("express")();
// const mongoose = require("mongoose");
// const handlebars = require("express-handlebars");

const config = require("./config/config")[env];
const app = require("express")();

require("./config/db")(app); // want this to happen first
require("./config/express")(app);
require("./config/routes")(app);

app.listen(
	config.port,
	console.log(`Listening on port ${config.port}! Now its up to you...`)
);
