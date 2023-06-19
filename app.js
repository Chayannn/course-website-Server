import express from "express";
import { config } from "dotenv";
import ErrorMiddleware from "./middlewares/Error.js";
import cookieparser from "cookie-parser";
import cors from "cors";

config({
  path: "./config.env",
});

const app = express();

// Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieparser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    
  })
);

// Importing & Using Routes
import course from "./routes/courseRoutes.js";
import users from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";

app.use("/api/v1", course);
app.use("/api/v1", users);
app.use("/api/v1", payment);
app.use("/api/v1", other);

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working.click <a href=${process.env.FRONTEND_URL}>here</a></h1>`
  )
);

export default app;

app.use(ErrorMiddleware);
