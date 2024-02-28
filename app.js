import OpenAI from "openai";
import 'dotenv/config'
import readline from 'readline';
import fetch from 'node-fetch';
import fs from "fs";
import path from 'path';

const openai = new OpenAI(
);

const speechFile = path.resolve("./speech.mp3");

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    rl.question('How may I help? ', async (userRes) => {
        const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant."},{role: "user",content:userRes}],

        model: "gpt-3.5-turbo",
    });
        rl.close();
        console.log(completion.choices[0]);
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "alloy",
            input: "Today is a wonderful day to build something people love!",
          });
        console.log(speechFile);
        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(speechFile, buffer);
        
    });
    
}   
main();