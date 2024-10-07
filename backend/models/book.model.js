// models/book.model.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "English",
  },
  publisher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  availableCopies: {
    type: Number,
    default: 0,
  },
  tags: [
    {
      type: String,
    },
  ],
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  image: {
    type: String,
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Book = mongoose.model("Book", bookSchema);
