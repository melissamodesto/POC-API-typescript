import express, { Request, Response } from "express";
import * as ItemsService from "../services/itemsService";
import { BaseItem, Item } from "../items/itemInterface";

export const itemsRouter = express.Router();

itemsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemsService.findAll();
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send({ err: onmessage });
  }
});

itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const item: Item = await ItemsService.find(id);
    res.status(200).send(item);
  } catch (err) {
    res.status(404).send({ err: onmessage });
  }
});

itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;
    const newItem = await ItemsService.create(item);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(404).send({ err: onmessage });
  }
});

itemsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: BaseItem = req.body;
    const existingItem: Item = await ItemsService.find(id);

    if (existingItem) {
      const updatedItem = await ItemsService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await ItemsService.create(itemUpdate);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(404).send({ err: onmessage });
  }
});
