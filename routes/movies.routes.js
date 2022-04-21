// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");


router.get("/", (req, res) => {
    Movie.find()
    .then(function (allMovies) {
        res.render("movies/movies", { allMovies: allMovies } )
    })
    .catch(function (err) {
        console.log("Something went wrong", err.message);
      });
})

router.get("/create", (req, res) => {
    Celebrity.find()
    .then(function (allCelebrities) {
        res.render("movies/new-movie", {allCelebrities: allCelebrities});
    })
    .catch(function (err) {
        console.log("Something went wrong", err.message);
      });
})

router.post("/create", (req, res) => {
    Movie.create({...req.body})
        .then(function () {
            res.redirect("/movies")
        })
        .catch(function (err) {
            console.log("Something went wrong", err.message);
            res.render("movies/new-movie")
        });
})

router.get("/:id", (req, res) => {
    Movie.findById(req.params.id)
    .populate("cast")
    .then(function (movieDetails) {
        res.render("movies/movie-details", {movieDetails: movieDetails})
    })
    .catch(function (error) {
        res.redirect("/movies")
    })
});

router.post("/:id/delete", (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
        .then(function () {
            res.redirect("/movies")
        })
        .catch(function (err) {
            console.log("Something went wrong", err.message);
        });
})

router.get("/:id/edit", (req, res) => {
    Movie.findById(req.params.id)
        .then(function (foundMovie) {
            Celebrity.find()
                .then(function (allCelebs) {
                    res.render("movies/edit-movie", {movie: foundMovie, celebrities: allCelebs})
                })
        })
    .catch(function () {
        res.redirect("/movies")
    })
});

router.post("/:id/edit", (req, res) => {
    Movie.findByIdAndUpdate(req.params.id, {...req.body} )
        .then(function () {
            res.redirect("/movies")
        })
        .catch(function (err) {
            console.log("Something went wrong", err.message);
        });
})

module.exports = router;