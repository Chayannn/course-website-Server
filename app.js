import express from "express";
import { config } from "dotenv";

config({
  path: "./config/config.env",
});

const app = express();

// Importing & Using Routes
import course from "./routes/courseRoutes.js";
app.use("/api/v1", course);

import users from "./routes/userRoutes.js";
app.use("/api/v1", users);

export default app;
