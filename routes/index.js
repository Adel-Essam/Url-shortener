const urlM = require("../models/urlModel");
const router = require("express").Router();
const axios = require("axios");

async function isUrlAccessible(url) {
	try {
		const response = await axios.head(url);
		return response.status === 200;
	} catch (error) {
		return false;
	}
}

router.get("/:alias", async function (req, res, next) {
	try {
		// 1) we will search in the database for the alias that the user inputed
		console.log("req.params :>> ", req.params);
		const alias = req.params.alias;
		const document = await urlM.findOne({ alias });
		console.log("documents :>> ", document);
		// 2) if url not there then create an error saying that url not found
		if (!document) {
			return res.render("error", {
				message: `There is no url with this alias: ${alias} !!`,
			});
		}
		// 3) if url exists then go to the original url
		res.redirect(document.url);
	} catch (error) {
		res.status(400).json({
			status: "error",
			message: error.message,
			error,
		});
	}
});

/* GET home page. */
router.get("/", async function (req, res, next) {
	try {
		// 1) get all the urls and their shorting
		const documents = await urlM.find();

		res.render("index", { title: "Express", documents });
	} catch (error) {
		res.status(400).json({
			status: "error",
			message: error.message,
			error,
		});
	}
});

router.post("/api/", async function (req, res, next) {
	try {
		const { alias, url } = req.body;
		// 1) check if the url is valid
		const isValid = await isUrlAccessible(url);
		if (!isValid)
			return res.status(400).json({
				status: "fail",
				message: "The url is not accessable!!",
			});
		// 2) create a document with the url in the database
		const shortUrl = `http://${req.get("host")}/${alias}`;
		const document = await urlM.create({ url, alias, shortUrl });

		res.status(201).json({
			status: "success",
			data: {
				document,
			},
		});
	} catch (error) {
		res.status(400).json({
			status: "error",
			message: error.message,
			error,
		});
	}
});

module.exports = router;
