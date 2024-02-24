import OpenAI from "openai";
import 'dotenv/config'

const openai = new OpenAI(
);

async function main() {
    
    let userRes = "I need help with my math homework"
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant."},{role: "user",content:userRes}],

        model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
}   

main();