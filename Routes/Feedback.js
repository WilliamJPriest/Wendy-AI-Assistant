
import express from 'express';
import feedbackController from './Controllers/feedbackController'
const router= express.Router()

router.post('/', async (req,res)=>{
    res.send("Hello")
    feedbackController(req,res)



})

module.exports = router;