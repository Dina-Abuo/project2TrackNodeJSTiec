const Movie = require('../models/movie.model');

const addMovie = async (req, res) => {
    const {title, category, rating } = req.body;

    if (!title || !category || !rating) {
        return res.status(400).json({ message: "You Must Complete The Required Data " });
    }

    if (rating < 0 || rating > 10) {
        return res.status(400).json({ message: "Rating must be between 0 and 10" });
    }
    try {
        const newMovie = await Movie.create({
            title,
            category,
            rating
        });

        return res.status(201).json({
            message: "Movie added successfully",
            newMovie,
        });

    } catch (error) {
        res.status(400).json({ message:error.message});
    }

};

const  getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        return res.json(movies);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMovieByTitle = async (req, res) => {
    const delete_movie = await Movie.findOneAndDelete({ title: req.params.title });

    if (!delete_movie) {
        return res.status(404).json({ message: "Movie not found" });
    }

    res.json({ message: "Movie deleted successfully" });
};

const  getMovieById = async (req, res) => {
    let id = req.params.movieId;
    const movie_id = await Movie.findById(id);
    if (!movie_id) {
        return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie_id);
};

const getMoviesByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const movies = await Movie.find({ category: { $regex: category, $options: 'i' } });
        res.json(movies);
    } catch (error) {
        res.status(400).json({ message: "Error getting movies by category" });
    }
};

const updateMovieRate = async (req, res) => {
    const { rating } = req.body;

    if (!rating || rating < 0 || rating > 10) {
        return res.status(400).json({ message: "Rating must be between 0 and 10" });
    }

    const update_movie = await Movie.findByIdAndUpdate(req.params.movieId, { rating }, { new: true });


    if (!update_movie) return res.status(404).json({ message: "Movie not found" });
    res.json(update_movie);
};

module.exports={
    getMoviesByCategory,
    getMovieById,
    updateMovieRate,
    deleteMovieByTitle,
    getAllMovies,
    addMovie
}
