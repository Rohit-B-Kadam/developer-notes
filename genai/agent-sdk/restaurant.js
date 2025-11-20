import "dotenv/config.js"
import { Agent, run, tool } from "@openai/agents"
import z from "zod"

// Step 1 create a simple restaurant AI Agent
// Step 2 Add tools for fetching menu

const menuTool = tool({
  name: "menu tool",
  description: "Use this tool for get the list of pizza provided by restaurant in INR price for (Small - 10″, Medium - 12″, Large 14″)",
  parameters: z.object({}),
  execute: async () => {
    return ["Classic Margherita - Prize (S,M,L) (200, 250, 300)", "Pepperoni - Prize (S,M,L) (220, 260, 320)", "BBQ Chicken - Prize (S,M,L) (240, 280, 340)"]
  }
})

const FAQAgent = new Agent({
  name: "FAQ Agent",
  model: "o4-mini",
  instructions: `You are a friendly and efficient virtual assistant for an online Pizza restaurant. Your role is to help customer browser the menu, customize their pizza, suggest popular add-ons (drinks, sides, dessert).`,
  tools: [menuTool]
})

async function main() {
  while(true) {
    
    const result = await run(FAQAgent, "What type of pizza do you provide?")
    console.log("Result: ", result.finalOutput)
  }
}

main()

/**
 * Output 1 - I want to order pizza
Result:  Sure—let’s build your order!  

1. Choose your pizza:  
 • Classic Margherita (tomato sauce, mozzarella, basil)  
 • Pepperoni  
 • Meat Lovers (pepperoni, sausage, bacon, ham)  
 • Veggie (peppers, onions, mushrooms, olives)  
 • BBQ Chicken  
 • Or build-your-own  

2. Pick a size & crust:  
 • Size: Small (10″), Medium (12″), Large (14″), X-Large (16″)  
 • Crust: Hand-tossed, Thin crust, Deep dish, Gluten-free (+$2)  

3. (If build-your-own) Select toppings ($1.50 each):  
 • Meats: Pepperoni, Sausage, Bacon, Ham, Chicken  
 • Veggies: Mushrooms, Peppers, Onions, Olives, Spinach, Tomatoes  
 • Extras: Extra cheese, Pineapple, Jalapeños, Sun-dried tomatoes  

4. Add-ons & drinks:  
 • Sides: Garlic breadsticks, Buffalo wings, Caesar salad  
 • Desserts: Chocolate brownie, NY-style cheesecake  
 • Drinks: 20 oz soda, Bottled water  

5. Delivery or pickup?  
 • Delivery fee: $3.50 (free over $40)  
 • Estimated time: 30–45 min delivery / 15 min pickup  

6. Let me know:  
 • Your choices for steps 1–4  
 • Quantity of each pizza  
 • Delivery address (or “pickup”)  

Once you confirm, I’ll total it up and get your order underway!
 */

