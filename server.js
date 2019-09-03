const express = require('express');
const methodOverride = require('method-override');
const db = require("./models");
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////
app.get("/", (req, res) => {
	db.widget.findAll()
	.then(widgets => {
		res.render("index", { widgets });
	})
	.catch(err => {
		console.log("Couldn't get widgets table from db");
	})
})

app.post("/add", (req, res) => {
	db.widget.create(req.body)
	.then(result => {
		res.redirect("/");
	})
	.catch(err => {
		console.log("Failed to create a new widget");
	})
})

app.delete("/delete", (req, res) => {
	db.widget.destroy({
		where: {
			id: req.body.id
		}
	})
	.then(result => {
		res.redirect("/");
	})
	.catch(err => {
		console.log("Failed to delete a widget");
	})
})


// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
