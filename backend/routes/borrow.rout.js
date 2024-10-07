import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { borrowBook, returnBook } from "../controllers/borrow.controller.js";

const router = express.Router();

router.post("/borrow", protectRoute, borrowBook);
router.post("/return", protectRoute, returnBook);

export default router;
