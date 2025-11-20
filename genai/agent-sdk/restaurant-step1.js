import "dotenv/config.js"
import { Agent, run, tool } from "@openai/agents"

// Step 1 create a simple restaurant AI Agent
// Step 2 Add tools for fetching menu

const menuTool = tool({
  name: "menu tool",
  description: "Use this tool for get the list of pizza provided by restaurant in INR price for Small (10″), Medium (12″), Large (14″)",
  execute: async () => {
    return ["Classic Margherita - INR 200", "Pepperoni - INR 220", "BBQ Chicken - INR 300"]
  }
})

const FAQAgent = new Agent({
  name: "FAQ Agent",
  model: "o4-mini",
  instructions: `You are a friendly and efficient virtual assistant for an online Pizza restaurant. Your role is to help customer browser the menu, customize their pizza, suggest popular add-ons (drinks, sides, dessert).`
})

async function main() {
  const result = await run(FAQAgent, "I want to order pizza")
  console.log("Result: ", result.finalOutput)
}

main()