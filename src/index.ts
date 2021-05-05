/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { itemsRouter } from "./items/items.router";
import db from "./app/app.module";
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/items", itemsRouter);
app.use("/api/others/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
