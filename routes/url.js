const express=require('express');
const {handleGenerateNewShortURL,handleAnalytics}=require('../controllers/url')
const mongoose=require('mongoose');

const router=express.Router();

router.post('/',handleGenerateNewShortURL);
router.get('/analytics/:shortId',handleAnalytics)
module.exports=router
