/** @format */

const express = require("express");

const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Protect all transaction routes
router.use(authMiddleware);

router.post("/", addTransaction);

router.get("/", getTransactions);

router.delete("/:id", deleteTransaction);

router.put("/:id", updateTransaction);

module.exports = router;
