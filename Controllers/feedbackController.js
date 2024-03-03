import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import Player from 'play-sound'; 


        

const feedbackController =  (req,res)=>{
    try{
        res.send({ message: 'Successfully uploaded files' })
        const openai = new OpenAI();

        const player = new Player();

        const speechFile = path.resolve('./speech.mp3');

        async function main() {

            const transcription = await openai.audio.transcriptions.create({
                file: fs.createReadStream("Rev.mp3"),
                model: "whisper-1",
            });

            let userRes = transcription.text



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


            player.play(speechFile, (err) => {
                if (err) {
                    console.error('Error playing audio:', err);
                }
            });
        };

    main();

    }catch{

    }

}

export default feedbackController;