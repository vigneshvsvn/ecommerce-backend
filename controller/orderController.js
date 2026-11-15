const mongoose = require("mongoose");
const orderModel = require("../model/order.model");

const getOrders = async (req, res) => {
  try {
    const filter = req.role === "Admin" ? {} : { userId: req.userID };
    const orders = await orderModel.find(filter);
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

const addOrder = async (req, res) => {
  try {
    const order = await orderModel.create({
      ...req.body,
      userId: req.userID,
    });
    return res.status(201).json({ success: true, order });
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, message: "Failed to create order" });
  }
};

const updateOrder = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid order id" });
  }

  try {
    const order = await orderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, order });
  } catch (err) {
    if (err.name === "ValidationError" || err.name === "CastError") {
      return res.status(400).json({ success: false, message: err.message });
    }
    return res.status(500).json({ success: false, message: "Failed to update order" });
  }
};

const deleteOrder = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ success: false, message: "Invalid order id" });
  }

  try {
    const order = await orderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    return res.status(200).json({ success: true, message: "Order deleted", order });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Failed to delete order" });
  }
};

module.exports = { getOrders, addOrder, updateOrder, deleteOrder };
