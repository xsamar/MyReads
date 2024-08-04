import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import BookShelf from './components/BookShelf'; 
import SearchPage from '../src/components/SearchPage'; 
import { useBooks } from '../src/components/BooksContext';

function App() {
  const { books, fetchBooks, updateBookShelf } = useBooks();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    title="Currently Reading"
                    books={books.filter(book => book.shelf === 'currentlyReading')}
                    onUpdateBookShelf={updateBookShelf}
                  />
                  <BookShelf
                    title="Want to Read"
                    books={books.filter(book => book.shelf === 'wantToRead')}
                    onUpdateBookShelf={updateBookShelf}
                  />
                  <BookShelf
                    title="Read"
                    books={books.filter(book => book.shelf === 'read')}
                    onUpdateBookShelf={updateBookShelf}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          }
        />
        <Route
          path="/search"
          element={<SearchPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
