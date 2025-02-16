const httpStatusText =require("../utils/httpStatusText");
const asyncWrapper=require("../middlewares/asyncWrapper");
const User =require ("../models/users.model");


const getAllUsers=asyncWrapper(async(req,res)=>{
    
    const query= req.query;
    const limit = query.limit||10;
    const page = query.page||1;  
    const skip = (page-1)*limit;
    const users = await User.find({}, { __v: 0, password: 0 }).sort({ createdAt: -1 }).limit(limit).skip(skip);
    return res.json({status:httpStatusText.SUCCESS,data:{users}})

})

// Get favorites list
const getFavList = asyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.currentUser.id).populate('favList');
    return res.json({ status: httpStatusText.SUCCESS, data: { favList: user.favList } });
});

// Add or remove from favorites
const toggleFavList = asyncWrapper(async (req, res, next) => {
    const movieId = req.params.id;
    const user = await User.findById(req.currentUser.id);
    if (user.favList.includes(movieId)) {
        user.favList.pull(movieId);
        await user.save();
        return res.json({ status: httpStatusText.SUCCESS, message: "Movie removed from favorites" });
    } else {
        user.favList.push(movieId);
        await user.save();
        return res.json({ status: httpStatusText.SUCCESS, message: "Movie added to favorites" });
    }
});

// Get watch later list
const getWatchLater = asyncWrapper(async (req, res, next) => {
    const user = await User.findById(req.currentUser.id).populate('watchLater');
    return res.json({ status: httpStatusText.SUCCESS, data: { watchLater: user.watchLater } });
});

// Add or remove from watch later list
const toggleWatchLater = asyncWrapper(async (req, res, next) => {
    const movieId = req.params.id;
    const user = await User.findById(req.currentUser.id);

    if (user.watchLater.includes(movieId)) {
        user.watchLater.pull(movieId);
        await user.save();
        return res.json({ status: httpStatusText.SUCCESS, message: "Movie removed from watch later list" });
    } else {
        user.watchLater.push(movieId);
        await user.save();
        return res.json({ status: httpStatusText.SUCCESS, message: "Movie added to watch later list" });
    }
});

module.exports = {
    getAllUsers,
    getFavList,
    toggleFavList,
    getWatchLater,
    toggleWatchLater
}