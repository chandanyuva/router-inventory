const express = require("express");
const path = require("node:path");

const indexRouter = require("./routes/indexRouter.js");
const routersRouter = require("./routes/routersRouter.js");
const searchRouter = require('./routes/searchRouter');
const viewRouter = require('./routes/viewRouter');

const app = express();

// ejs setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//for post request
app.use(express.urlencoded({ extended: true }));

//This middleware tells Express: "If the incoming request has a Content-Type: application/json, parse the JSON body and assign it to req.body."
app.use(express.json());

app.use(express.static('public'))

app.use("/", indexRouter);
app.use('/search', searchRouter);
app.use("/routers", routersRouter);
app.use('/view', viewRouter);

const PORT = process.env.PORT || 3000;
const HOST = 0.0.0.0;
app.listen(PORT, HOST () => {
    console.log(`listening on port ${PORT}!`);
});
