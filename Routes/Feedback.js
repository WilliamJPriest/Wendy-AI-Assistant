
import express from 'express';
import feedbackController from '../Controllers/feedbackController.js'
const router= express.Router()
import multer from 'multer';    
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    })     
const upload = multer({ storage })



router.post('/', upload.any('file'), async (req,res)=>{

    res.send("Hello")

    console.log(upload) 
    await feedbackController(req,res)



})

export default router;