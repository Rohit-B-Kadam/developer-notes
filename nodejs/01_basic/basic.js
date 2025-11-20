
console.log(process.argv)
const mission = process.argv[2]


if (mission === "learning") {
  console.log("Time to write some Node code!")
} else {
  console.log(`Is ${mission} really more fun?`)
}


setTimeout(() => {
  console.log("Message after 1000")
}, 1000)