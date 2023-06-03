import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";

config({
  path: "./config/config.env",
});

const app = express();

// Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Importing & Using Routes
import course from "./routes/courseRoutes.js";
app.use("/api/v1", course);

import users from "./routes/userRoutes.js";

app.use("/api/v1", users);

export default app;

app.use(ErrorMiddleware);
