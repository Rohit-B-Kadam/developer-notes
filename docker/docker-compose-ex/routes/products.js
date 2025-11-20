import express from "express";
import db from "../lib/db.js";
import { usersTable } from "../lib/schema.js";
import { eq } from "drizzle-orm";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await db.select().from(usersTable);
  res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
  res.status(200).json(product);
});

export default router;
