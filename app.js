import express from 'express';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import Player from 'play-sound';

const app = express();
const port = 3000

import FeedbackRoute from './Routes/feedback.js'

app.use("/feedback",FeedbackRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


export default app;