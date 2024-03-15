
import express from 'express';
import feedbackController from '../controllers/feedbackController.js'
const router= express.Router()
import multer from 'multer';    
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, "speech.mp3")
    },
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    })     
const upload = multer({ storage: storage })



router.post('/', upload.any('file'), async (req, res) => {
    try {
        console.log(upload)
        feedbackController(req, res)
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal Server Error")
    }
})

export default router;