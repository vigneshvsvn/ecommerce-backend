const express = require("express");
const router = express.Router();

const orderController = require("../controller/orderController");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/view", authMiddleware(), orderController.getOrders);
router.post("/save", authMiddleware(), orderController.addOrder);
router.put("/update/:id", authMiddleware("Admin"), orderController.updateOrder);
router.delete("/remove/:id", authMiddleware("Admin"), orderController.deleteOrder);

module.exports = router;
