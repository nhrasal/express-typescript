import express from "express";
import { ItemController } from "./item.controller";

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */ 

// GET items

itemsRouter.get("/", ItemController.getItems);

// GET /:id

itemsRouter.get("/:id", ItemController.findOne);

// POST items

itemsRouter.post("/", ItemController.createItem);

// PUT /:id

itemsRouter.put("/:id", ItemController.UpdateItem);

// DELETE /:id

itemsRouter.delete("/:id", ItemController.deleteOne);
