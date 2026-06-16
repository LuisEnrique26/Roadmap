import express from "express";
import router from "./src/modules/transactions/infrastructure/routes.js";
import { connectMongo } from "./src/core/config/mongo.js";
import "dotenv/config";

const app = express();
app.use(express.json());

await connectMongo();

app.use("/api/v1", router);

app.listen(3000, () => { console.log("Server listening on port 3000"); });

export { app };