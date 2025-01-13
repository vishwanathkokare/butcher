import orderModel from "../modals/order.js";

export const createOrder = async (req, res) => {
  try {
    const { name, quantity, address, phone, items } = req.body;
    if (!name || !quantity || !address || !phone || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All Fields Required",
      });
    }
    const order = new orderModel({ name, quantity, address, phone, items });
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Order Created",
      order,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};