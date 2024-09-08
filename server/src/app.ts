import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import routes from "./config/routes";
import cors from "cors";
import {AppDataSource} from "./data-source";
import dotenv from 'dotenv';
import rateLimit from "express-rate-limit";

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: "Too many requests from this IP, please try again later.",
});

const app = express();
const port = 8080;

// Allow Angular development URL to access the application
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(apiLimiter);

app.use(bodyParser.json());

app.use('/api', routes);
app.use('/api', routes);

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
