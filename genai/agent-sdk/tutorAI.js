import "dotenv/config.js"
import { Agent, run, tool } from "@openai/agents"
import z from "zod"



const historyFunFact = tool({
  name: "history_fun_fact", // name use by agent for calling this function, should be unique to that function
  description: "Give fun fact about a historical events", // description describe when to use and what it will return
  parameters: z.object({}), // tool will not take any param so zod empty object
  execute: async () => {
    // output will be return back to agent
    const facts = ["Sharks are older than trees", "Napoleon wasn't actually short", "Oxford University is older than the Aztec Empire", "Ketchup was once sold as medicine"]

    return facts[Math.floor(Math.random() * facts.length)]
  }
})

// Create a history tutor agent
const historyTutorAgent = new Agent({
  name: "History Tutor",
  instructions: "You provide assistant with historical queries. Explain important event and context clearly",
  model: "gpt-4o-mini",
  tools: [historyFunFact]
})

const mathTutorAgent = new Agent({
  name: 'Math Tutor',
  model: "gpt-4o-mini",
  instructions:
    'You provide help with math problems. Explain your reasoning at each step and include examples',
});


// Gateway
const tutorAgent = Agent.create({
  name: "Tutor Agent",
  model: "gpt-4o-mini",
  instructions: "You determine which agent to use based on the user's homework question, Please do handoff",
  handoffs: [historyTutorAgent, mathTutorAgent]
})


// Entry Point
async function main() {
  const result = await run(tutorAgent, "what is answer of 2*5+4?");
  console.log("\n-------------------------OUTPUT--------------------------------\n")
  console.log(result.history)
  console.log(result.finalOutput)
}
// You can traces the result from below link
// https://platform.openai.com/logs?api=traces

main()

