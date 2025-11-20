import express from "express";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.status(200).send({ message: "Hello, From Docker!!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
