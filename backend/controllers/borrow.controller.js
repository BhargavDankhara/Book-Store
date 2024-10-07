import { Book } from "../models/book.model.js";

export async function borrowBook(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ msg: "No available copies to borrow" });
    }

    book.availableCopies -= 1;
    book.borrowedBy = req.user._id;
    await book.save();

    res.json({ msg: "Book borrowed successfully" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server error");
  }
}

export async function returnBook(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (book.borrowedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to return this book" });
    }

    book.availableCopies += 1;
    book.borrowedBy = null;
    await book.save();

    res.json({ msg: "Book returned successfully" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server error");
  }
}
