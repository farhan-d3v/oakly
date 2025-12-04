import mongoose, { Schema, Document } from "mongoose";

export interface IInventory extends Document {
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

const InventorySchema = new Schema<IInventory>(
  {
    name: { type: String, required: true },
    sku: { type: String, unique: true },   // no required
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
);

// Auto-generate SKU safely
InventorySchema.pre("save", function (next) {
  if (!this.sku || this.sku === "") {
    this.sku =
      "SKU-" +
      Math.random().toString(36).substring(2, 9).toUpperCase() +
      "-" +
      Date.now().toString().slice(-4);
  }
  next();
});

export default mongoose.model<IInventory>("Inventory", InventorySchema);
