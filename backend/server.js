import express from "express";
import cors from "cors";
import ecochallenge from "./api/eco-challenge.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/eco-challenge", ecochallenge);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
