import "dotenv/config";
import { OpenAI } from "openai";

// Tools
const budgetTable = new Map([["groceries", 10000]]);

function createBudget(name, amount) {
  if (budgetTable.has(name)) return "Budget is already created";
  budgetTable.set(name, amount);
  return "Budget added successfully";
}

function getBudget(name) {
  if (!budgetTable.has(name)) return "Budget not found";
  const amount = budgetTable.get(name);
  return { name, amount };
}

function getAllBudget() {
  return Object.fromEntries(budgetTable);
}

function updateBudget(name, newAmount) {
  if (!budgetTable.has(name)) return "Budget not found";
  budgetTable.set(name, newAmount);
  return "Budget updated successfully";
}

function deleteBudget(name) {
  if (!budgetTable.has(name)) return "Budget not found";
  budgetTable.delete(name);
  return "Budget deleted successfully";
}

const TOOLS = {
  createBudget: createBudget,
  getBudget: getBudget,
  getAllBudget: getAllBudget,
  updateBudget: updateBudget,
  deleteBudget: deleteBudget,
};

function handleActionCalling(action, name, amount) {
  const actionCallback = TOOLS[action];
  if (!actionCallback) return "No such action available";
  return actionCallback(name, amount);
}

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // Load OpenAI API key from .env file
  // apiKey: process.env.GEMINI_API_KEY,
  // baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const SystemPrompt = `
You are an AI Assistant that run in loop of THINK, ACTION, and OBSERVATION state.
At the end of the loop you OUTPUT an answer.
Use Action to run one of the actions available to you - then wait till observation.
Observation will be the result of the running those actions.
Perform the task step by step, One step at a time
Output will be in form of json

Your available actions are:
- createBudget:
  This action will create new budget if not exist. You will need to provide name: budget name, amount: budget amount

- getBudget
  This action will return budget amount if exist. You will need to provide budget name

- getAllBudget
  This action will return all the budget user has created.

- updateBudget
  This action will update the existing budget amount. You will need to provide budget name

- deleteBudget
  This action will delete the existing budget, You will need to provide budget name

Example session
{ "state": "input",  "input":  "Create a new dining out budget of ₹5000. Give me the sum of the groceries and dining budgets."}
{ "state": "thought", "thought": "I will need to first create new budget of 5000 for dining" }
{ "state": "action", "action": "createBudget", "name": "dining", "amount": 5000 }
{ "state": "observation", "observation": "Budget added successfully" }
{ "state": "thought", "thought": "I will need to get budget amount for groceries" }
{ "state": "action", "action": "getBudget", "name": "groceries" }
{ "state": "observation", "observation": "{'name': 'groceries', 'amount': 10000 }" }
{ "state": "thought", "thought": "As I have budget of both groceries and dining, so now I can answer the user input" }
{ "state": "output" , "output": "The total budget of groceries and dining is 15000rs "}
`;

const chatHistory = [
  {
    role: "system",
    content: SystemPrompt,
  },
];

async function agentAI(userMessage) {
  // Add user's message to the memory
  chatHistory.push({
    role: "user",
    content: JSON.stringify({ step: "input", input: userMessage }),
  });

  while (true) {
    // sending all messages to the bot
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // You can use any model name here
      // model: "gemini-2.0-flash",
      messages: chatHistory,
      response_format: { type: "json_object" },
    });

    // Add bot's reply to the memory
    const botMessage = response.choices[0].message.content;
    chatHistory.push({ role: "assistant", content: botMessage });

    const step = JSON.parse(response.choices[0].message.content);

    if (step.state === "output") {
      console.log("FINAL OUTPUT: ", step);
      break;
    } else if (step.state === "action") {
      console.log("STEP: ", step);
      const observation = handleActionCalling(
        step.action,
        step.name,
        step.amount
      );
      const observationStep = JSON.stringify({
        step: "observation",
        observation,
      });
      console.log("STEP: ", observationStep);
      chatHistory.push({
        role: "developer",
        content: observationStep,
      });
    } else {
      console.log("STEP: ", step);
    }
  }
}

await agentAI("Can you add 5000rs more to my current groceries budget?");
