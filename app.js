import 'dotenv/config';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import fetch from 'node-fetch';
import Player from 'play-sound';

const openai = new OpenAI();

// Configure play-sound to use the default system player
const player = new Player();

const speechFile = path.resolve('./speech.mp3');

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('How may I help? ', async (userRes) => {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: 'You are a helpful assistant named Wendy ' },
                { role: 'user', content: userRes },
            ],
            model: 'gpt-3.5-turbo',
        });

        rl.close();
        console.log(completion.choices[0]);

        const mp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice: 'nova',
            input: completion.choices[0].message.content,
        });

        console.log(speechFile);

        const buffer = Buffer.from(await mp3.arrayBuffer());
        await fs.promises.writeFile(speechFile, buffer);


        player.play(speechFile, (err) => {
            if (err) {
                console.error('Error playing audio:', err);
            }
        });
    });
}

main();
