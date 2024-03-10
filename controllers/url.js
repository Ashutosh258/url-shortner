const {nanoid}  =require("nanoid");
const URL=require('../models/url')

async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shortID=nanoid(8);
    await URL.create({
        shortId:shortID,
        redirectedURL:body.url,
        visitedHistory:[],
    });
    return res.json({id:shortID});
}
//analytics systum
async function handleAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    });
}

module.exports={
    handleGenerateNewShortURL,
    handleAnalytics,
}