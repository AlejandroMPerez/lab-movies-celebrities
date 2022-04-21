// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/", (req, res, next) => {
    Celebrity.find()
    .then(function (allCelebrities) {
        res.render("celebrities/celebrities", { allCelebrities: allCelebrities } )
    })
    .catch(function (err) {
        console.log("Something went wrong", err.message);
      });
})

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
})

router.post("/create", (req, res, next) => {
    Celebrity.create({...req.body})
        .then(function () {
            res.redirect("/celebrities")
        })
        .catch(function (error) {
            console.log("Failed", error.message)
            res.render("celebrities/new-celebrity")
        })
})


module.exports = router; 