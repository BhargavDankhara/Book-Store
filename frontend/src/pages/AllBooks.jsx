// src/pages/AllBooks.js
import axios from "axios";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Filter from "../components/Filter";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filters, setFilters] = useState({
    genre: "",
    rating: "",
    availableCopies: "",
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/v1/books/get");
        setBooks(response.data);
        setFilteredBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = books;

      if (filters.genre) {
        filtered = filtered.filter((book) => book.genre === filters.genre);
      }

      if (filters.rating) {
        filtered = filtered.filter(
          (book) => book.rating >= parseInt(filters.rating)
        );
      }

      if (filters.availableCopies) {
        filtered = filtered.filter(
          (book) => book.availableCopies >= parseInt(filters.availableCopies)
        );
      }

      setFilteredBooks(filtered);
    };

    applyFilters();
  }, [filters, books]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5">
        <Filter onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <Card
              key={book._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {book.title}
                </h2>
                <p className="text-gray-600 mb-2">Author: {book.author}</p>
                <p className="text-gray-600 mb-2">Genre: {book.genre}</p>
                <p className="text-gray-600 mb-2">Language: {book.language}</p>
                <p className="text-gray-600 mb-2">
                  Publication Date: {book.publicationDate}
                </p>
                <p className="text-gray-600 mb-2">
                  Available Copies: {book.availableCopies}
                </p>
                <p className="text-gray-600 mb-2">
                  Publisher: {book.publisher}
                </p>
                <p className="text-gray-600">{book.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllBooks;
