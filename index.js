const express =require("express");
const urlRoute=require('./routes/url')
const URL=require('./models/url')
const {connectToMongoDB}=require("./connection/connect")
const app=express();
const PORT=8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("mongoDB connected"))
.catch((error)=>console.log("error in connection",error));   


//middleware
app.use(express.json())
app.use('/url',urlRoute)



app.get('/:shortId', async (req, res) => {
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