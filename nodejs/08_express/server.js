const express = require("express")

const app = express();

const PORT = 8080

app.get("/", (req, res) => {
  res.send("Hello World")
})


const friends = [
  {
    id: 0,
    name: "Sir Nicola Tesla"
  },
  {
    id: 1,
    name: "Sir Isaac Newton"
  },
  {
    id: 2,
    name: "Sir Albert Einstein"
  }
]


app.get("/friends", (req, res) => {
  res.send(friends)
})

app.get("/friends/:id", (req, res) => {
  const id = Number(req.params.id)
  const selectedFriend = friends.find(friend => friend.id === id)
  if(!selectedFriend) {
    res.status(404).json({ 
      error: "Friend not found!"
    })
  }
  res.status(200).json(selectedFriend)
})

app.listen(PORT, () => {
  console.log(`Application is running on http://localhost:${PORT}`)
})
