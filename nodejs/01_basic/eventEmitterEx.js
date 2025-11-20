const EventEmitter = require("node:events")

const celebrity = new EventEmitter()

const listener1 = (event) => {
  console.log("Event is fired", event)
}

celebrity.on("new-movie",listener1)

celebrity.emit("new-movie", { name: "Something new" })

celebrity.off("new-movie",listener1)

celebrity.emit("new-movie", { name: "Something new" })