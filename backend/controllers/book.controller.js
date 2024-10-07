import { Book } from "../models/book.model.js";
import fs from "fs";

export async function createBook(req, res) {
  const {
    title,
    author,
    publicationDate,
    genre,
    language,
    publisher,
    description,
    availableCopies,
    tags,
    rating,
  } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Store the image URL

  try {
    const newBook = new Book({
      title,
      author,
      publicationDate,
      genre,
      language,
      publisher,
      description,
      availableCopies,
      tags,
      rating,
      image,
    });

    await newBook.save();
    res.json(newBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

export async function getBooks(req, res) {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

export async function getBookById(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server error");
  }
}

export async function updateBook(req, res) {
  const {
    title,
    author,
    publicationDate,
    genre,
    language,
    publisher,
    description,
    availableCopies,
    tags,
    rating,
  } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    // Delete old image if new image is uploaded
    if (image && book.image) {
      const oldImagePath = book.image.replace("/uploads/", "");
      fs.unlinkSync(`uploads/${oldImagePath}`);
    }

    book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        publicationDate,
        genre,
        language,
        publisher,
        description,
        availableCopies,
        tags,
        rating,
        image,
      },
      { new: true }
    );

    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server error");
  }
}

export async function deleteBook(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    // Delete image if exists
    if (book.image) {
      const imagePath = book.image.replace("/uploads/", "");
      fs.unlinkSync(`uploads/${imagePath}`);
    }

    await book.deleteOne();
    res.json({ msg: "Book removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server error");
  }
}
