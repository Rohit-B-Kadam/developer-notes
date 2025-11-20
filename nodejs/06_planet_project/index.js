const fs = require("node:fs")
const { parse } = require("csv-parse")
const { hasUncaughtExceptionCaptureCallback } = require("node:process")

const habitablePlanets = []

function isHabitablePlanet(planet) {
  return planet["koi_disposition"] === "CONFIRMED" &&              // Planet should be confirm
    planet["koi_insol"] >= 0.36 && planet["koi_insol"] < 1.11 &&   // Amount of the sunlight receive on the planet it should be between 0.36 to 1.11 of the earth light
    planet["koi_prad"] < 1.6                                       // Radius of the planet
}

fs.createReadStream("kepler_data.csv")
  .pipe(parse({
    comment: "#",
    columns: true
  }))
  .on("data", (data) => {
    // Filter the data such that we save that planet which is similar to the earth
    if (isHabitablePlanet(data)) {
      habitablePlanets.push(data)
    }
  })
  .on("error", (error) => {
    console.log("Error", error)
  })
  .on("end", () => {
    console.log("Habitable Planets: ", habitablePlanets.map(planet => {
      return planet["kepler_name"]
    }))
    console.log(`${habitablePlanets.length} habitable planets found!`)
  })