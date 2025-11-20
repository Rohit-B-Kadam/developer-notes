const fs = require("node:fs")
const path = require("node:path")
const { Transform } = require("node:stream")

const inputPath = path.join(__dirname, "input.txt" )
const outputPath = path.join(__dirname, "output.txt")

const readableStream = fs.createReadStream(inputPath)

const writeableStream = fs.createWriteStream(outputPath)

// readableStream.on("data", (chunk) => {
//   writeableStream.write(chunk.toString().toUpperCase())
// })

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

readableStream.pipe(upperCaseTransform).pipe(writeableStream)