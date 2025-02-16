const express = require("express");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middlewares/allowedTo");
const movieController=require("../controllers/movie.controller");
const verifyToken =require("../middlewares/verifyToken")
const router = express.Router();


router.route('/').get(movieController.getAllMovies)
                .post(verifyToken,allowedTo(userRoles.ADMIN), movieController.addMovie);
router.route('/:movieId').get(movieController.getMovieById)
                        .put(movieController.updateMovieRate);
router.route('/category/:category').get(movieController.getMoviesByCategory);
router.route('/:title').delete(movieController.deleteMovieByTitle);

module.exports = router;