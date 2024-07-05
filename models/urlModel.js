const mongoose = require("mongoose");

var urlSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
		unique: [true, "a url must have an original url."],
	},
	shortUrl: {
		type: String,
		required: true,
		unique: [true, "a url must have a short url."],
	},
	alias: {
		type: String,
		required: true,
		unique: [true, "a url must have an alias."],
	},
});

module.exports = mongoose.model("Url", urlSchema);
