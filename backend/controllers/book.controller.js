import { Book } from "../models/book.model.js";
import upload from "../middleware/multerMiddleware.js";
import { uplodeOnCloudinary } from "../utils/cloudinary.js";

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
  const image = req.file ? req.file.path : null;

  try {
    let imageUrl = null;
    if (image) {
      const response = await uplodeOnCloudinary(image);
      if (response) {
        imageUrl = response.secure_url;
      }
    }

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
      image: imageUrl,
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
  const image = req.file ? req.file.path : null;

  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    let imageUrl = book.image;
    if (image) {
      const response = await uplodeOnCloudinary(image);
      if (response) {
        imageUrl = response.secure_url;
      }
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
        image: imageUrl,
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

    // Delete image from Cloudinary if exists
    if (book.image) {
      const publicId = book.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
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
