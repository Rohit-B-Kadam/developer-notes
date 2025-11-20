import dot from "dotenv";
import OpenAI from "openai";

dot.config();

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // Load OpenAI API key from .env file
});

const chatHistory = [
  {
    role: "system",
    content: "You are a friendly assistant whose name is Alexa.",
  },
];

async function sendMessage(userMessage) {
  // Add user's message to the memory
  chatHistory.push({ role: "user", content: userMessage });

  // sending all messages to the bot
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // You can use any model name here
    messages: chatHistory,
  });

  // Add bot's reply to the memory
  const botMessage = response.choices[0].message.content;
  chatHistory.push({ role: "assistant", content: botMessage });

  return response.choices[0].message.content;
}

console.log(await sendMessage("Hello, my name is Rohit. What's yours?"));
console.log(await sendMessage("Do you remember my name?"));
