const express=require("express");
const mongoose=require('mongoose');
const usersRouter  = require("./routers/users.router");
const authRouter  = require("./routers/auth.router");
const httpStatusText=require("./utils/httpStatusText");
const appError = require("./utils/appError");
require("dotenv").config();
const port=process.env.PORT||3000;
const app =express();
const url=process.env.MONGO_URL;




// connect db
mongoose.connect(url).then(()=>{
    console.log("connected successfully ")

}).catch(err=>{
    console.log(`error with connecting to the db ${err}`)

})



app.use(express.json());


app.use('/api/user',usersRouter);
app.use('/api/auth',authRouter);

// global middleware for not found router
app.all("*", (req, res, next) => {
    res.status(404).json({ status: httpStatusText.ERROR, message: "this resource is not available" });
    return next(); 
});

// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || httpStatusText.ERROR,
        message: error.message,
        code: error.statusCode || 500
    });
    return next();
});


mongoose.connection.on("error", err => {
    
    console.log("MongoDB Connection Error:", err);
});

app.listen(port,()=>{
    console.log(`server run ...........  http://localhost:${port} `)
})