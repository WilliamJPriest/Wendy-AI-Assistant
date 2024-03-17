import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';

const feedbackController = async (req,res)=>{
        try {
            const openai = new OpenAI();
            const speechFile = path.resolve('./outputs/response.mp3');
            
            await convertBase64ToAudio(req.body.audio)

            const transcription = await openai.audio.transcriptions.create({
                file: fs.createReadStream("./uploads/speech.mp3"),
                model: "whisper-1",
            });
            
            let userRes = transcription.text;
    
            const completion = await openai.chat.completions.create({
                messages: [
                    { role: 'system', content: 'You are a helpful assistant named Wendy ' },
                    { role: 'user', content: userRes },
                ],
                model: 'gpt-3.5-turbo',
            });
    
            const mp3 = await openai.audio.speech.create({
                model: 'tts-1',
                voice: 'nova',
                input: completion.choices[0].message.content,
            });
    
            const buffer = Buffer.from(await mp3.arrayBuffer());
            await fs.promises.writeFile(speechFile, buffer);

            const responseObj = {
                messages: completion.messages,
                audio: buffer.toString('base64'), // Convert buffer to base64 for JSON transport
            };
           

    
            res.json(responseObj);
        } catch (err) {
            console.error("Error:", err);
            res.status(500).send("Internal Server Error");
        }
    };
    
const convertBase64ToAudio = async (base64String) =>{
    const outputPath = './uploads/speech.mp3';

    const base64Data = await base64String.replace(/^data:audio\/mpeg;base64,/, '');

    const audioFromFrontend = Buffer.from(base64Data, 'base64');

    fs.writeFileSync(outputPath, audioFromFrontend);

}

export default feedbackController;