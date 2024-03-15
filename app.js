import express from 'express';
import 'dotenv/config';


const app = express();
const port = 3000

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

import FeedbackRoute from './Routes/feedback.js'

app.use("/feedback",FeedbackRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


export default app;