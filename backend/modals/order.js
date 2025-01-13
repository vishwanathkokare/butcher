import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
      image: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;