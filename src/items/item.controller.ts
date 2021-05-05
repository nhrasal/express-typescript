import { Request, Response } from "express";
import { BaseItem, Item } from "./item.interface";
import * as ItemService from "./items.service";

/**
 * Controller Definitions
 */
export interface IGetAllResponse {
  status: boolean;
  message: string;
  payload: any[];
  total: number;
}
export const ItemController = {
  //   constructor() {}
  async getItems(req: Request, res: Response): Promise<any> {
    try {
      const items: Item[] = await ItemService.findAll();
      const response: IGetAllResponse = {
        status: true,
        message: "success Full Data get",
        payload: items,
        total: items.length,
      };
      res.status(200).send(response);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id, 10);

    try {
      const item: Item = await ItemService.find(id);

      if (item) {
        return res.status(200).send(item);
      }

      res.status(404).send("item not found");
    } catch (e) {
      res.status(500).send(e.message);
      await this.HTTPExceptionHandler(e.message);
    }
  },

  // POST items
  async createItem(req: Request, res: Response) {
    try {
      const item: BaseItem = req.body;

      const newItem = await ItemService.create(item);

      res.status(201).json(newItem);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
  // PUT items/:id
  async UpdateItem(req: Request, res: Response) {
    const id: number = parseInt(req.params.id, 10);

    try {
      const itemUpdate: Item = req.body;

      const existingItem: Item = await ItemService.find(id);

      if (existingItem) {
        const updatedItem = await ItemService.update(id, itemUpdate);
        return res.status(200).json(updatedItem);
      }

      const newItem = await ItemService.create(itemUpdate);

      res.status(201).json(newItem);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },
  // DELETE items/:id
  async deleteOne(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id, 10);
      await ItemService.remove(id);

      res.sendStatus(204);
    } catch (e) {
      res.status(500).send(e.message);
    }
  },

  async HTTPExceptionHandler(msg: string) {
    if (msg) {
      return await msg;
    }
    {
      return await "you have something went wrong";
    }
  },
};

// itemsRouter.delete("/:id", );
