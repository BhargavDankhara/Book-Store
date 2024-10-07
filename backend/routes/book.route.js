import express from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controllers/book.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  protectRoute,
  upload.fields([
    {
      name: "cover",
      maxCount: 1,
    },
  ]),
  createBook
);
router.get("/get", protectRoute, getBooks);
router.get("/get/:id", protectRoute, getBookById);
router.patch("/update/:id", protectRoute, updateBook);
router.delete("/delete/:id", protectRoute, deleteBook);

export default router;
