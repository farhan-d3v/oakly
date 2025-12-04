import { Request, Response } from "express";
import Inventory from "../models/Inventory.model";

export const addItem = async (req: Request, res: Response) => {
  const { name, quantity, price } = req.body;

  const item = await Inventory.create({ name, quantity, price });

  return res.status(201).json({
    message: "Item added successfully",
    item,
  });
};

export const getItems = async (req: Request, res: Response) => {
  const items = await Inventory.find().sort({ createdAt: -1 });
  return res.json({ items });
};

export const getItemById = async (req: Request, res: Response) => {
  const item = await Inventory.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });

  return res.json({ item });
};

export const getLowStockItems = async (req: Request, res: Response) => {
  const threshold = Number(req.query.threshold) || 10; // default 10

  const items = await Inventory.find({ quantity: { $lt: threshold } });

  return res.json({
    lowStock: items,
  });
};


export const updateItem = async (req: Request, res: Response) => {
  const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!item) return res.status(404).json({ message: "Item not found" });

  return res.json({
    message: "Item updated successfully",
    item,
  });
};

export const searchItems = async (req: Request, res: Response) => {
  const { q } = req.query;

  const items = await Inventory.find({
    name: { $regex: q, $options: "i" }
  });

  return res.json({ items });
};


export const getPaginatedItems = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  const items = await Inventory.find().skip(skip).limit(limit);

  const total = await Inventory.countDocuments();

  return res.json({
    page,
    totalPages: Math.ceil(total / limit),
    items
  });
};


export const deleteItem = async (req: Request, res: Response) => {
  const item = await Inventory.findByIdAndDelete(req.params.id);

  if (!item) return res.status(404).json({ message: "Item not found" });

  return res.json({
    message: "Item deleted successfully",
  });
};
