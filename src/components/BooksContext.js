import React, { createContext, useState, useContext } from 'react';
import * as BooksAPI from '../BooksAPI';

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const allBooks = await BooksAPI.getAll();
    setBooks(allBooks);
  };

  const updateBookShelf = async (book, shelf) => {
    await BooksAPI.update(book, shelf);
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.map(b =>
        b.id === book.id ? { ...b, shelf } : b
      );
      return updatedBooks;
    });
  };

  return (
    <BooksContext.Provider value={{ books, fetchBooks, updateBookShelf }}>
      {children}
    </BooksContext.Provider>
  );
};
