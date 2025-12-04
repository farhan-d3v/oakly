import express from "express";
import {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
  getLowStockItems,
  searchItems,
  getPaginatedItems
} from "../controllers/inventory.controller";

import { auth } from "../middleware/auth.middleware";

const router = express.Router();

// Create item
router.post("/", auth, addItem);

// Get all items
router.get("/", auth, getItems);

// Low stock (must be BEFORE :id)
router.get("/low-stock", auth, getLowStockItems);

// Search (must be BEFORE :id)
router.get("/search", auth, searchItems);

// Pagination (must be BEFORE :id)
router.get("/paginated", auth, getPaginatedItems);

// Single item (put this LAST)
router.get("/:id", auth, getItemById);

// Update item
router.put("/:id", auth, updateItem);

// Delete item
router.delete("/:id", auth, deleteItem);

export default router;
