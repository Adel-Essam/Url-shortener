const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");

const app = express();

const whitelist = ["*"];

app.use((req, res, next) => {
	const origin = req.get("referer");
	const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
	if (isWhitelisted) {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, OPTIONS, PUT, PATCH, DELETE"
		);
		res.setHeader(
			"Access-Control-Allow-Headers",
			"X-Requested-With,Content-Type,Authorization"
		);
		res.setHeader("Access-Control-Allow-Credentials", true);
	}
	// Pass to next layer of middleware
	if (req.method === "OPTIONS") res.sendStatus(200);
	else next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = process.env.NODE_ENV ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: err,
	});
});

module.exports = app;
