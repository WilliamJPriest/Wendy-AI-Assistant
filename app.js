import OpenAI from "openai";
import 'dotenv/config'
import readline from 'readline';

const openai = new OpenAI(
);

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    rl.question('How may I help?', async (userRes) => {
        const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant."},{role: "user",content:userRes}],

        model: "gpt-3.5-turbo",
    });
        rl.close();
        console.log(completion.choices[0]);
    });
    
}   
main();