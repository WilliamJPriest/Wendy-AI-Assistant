import express from 'express';
import 'dotenv/config';


const app = express();
const port = 3000

import FeedbackRoute from './Routes/feedback.js'

app.use("/feedback",FeedbackRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


export default app;