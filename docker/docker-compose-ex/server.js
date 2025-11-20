import express from "express";
import products from "./routes/products.js";

const PORT = 8080;

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, This is demo api" });
});

app.use("/products", products);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
