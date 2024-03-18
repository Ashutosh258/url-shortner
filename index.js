const express =require("express");

const URL=require('./models/url')
const path=require('path')
const {connectToMongoDB}=require("./connection/connect")
const cookieParser=require('cookie-parser')
const {restrictToLoggedinUsersOnly}=require('./middleware/auth')
const app=express();
const PORT=8001;


//routes
const urlRoute=require('./routes/url')
const staticRoute=require('./routes/staticRouter')
const userRoute=require('./routes/user')



connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("mongoDB connected"))
.catch((error)=>console.log("error in connection",error));   

app.set("view engine" ,"ejs");
app.set("views",path.resolve("./views"));


//middleware
app.use(express.json());     
app.use(express.urlencoded({extended:false}));  
app.use(cookieParser());


app.use('/url',restrictToLoggedinUsersOnly,urlRoute)
app.use('/',staticRoute)
app.use('/user',userRoute)


app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
   const entry= await URL.findOneAndUpdate(
    {
        shortId,
    },
        {
            $push: {
                visitHistory:{
                    
                    timestamp:Date.now(),
                },
            },
        });
        if (entry && entry.redirectedURL) { 
            res.redirect(entry.redirectedURL);
        } else {
            res.status(404).send('URL not found');
        }
});


app.listen(PORT,()=>console.log(`server started at port :${PORT}`))