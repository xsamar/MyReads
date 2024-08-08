import { useState, useEffect, useCallback } from 'react';
import { useBooks } from './BooksContext';
import * as BooksAPI from '../BooksAPI';
import debounce from 'lodash.debounce'; 

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null); 
  const { books, updateBookShelf } = useBooks();

  const fetchSearchResults = useCallback(
    debounce(async (queryValue) => {
      if (queryValue) {
        try {
          const results = await BooksAPI.search(queryValue);
          if (results.error) {
            setSearchResults([]);
            setError("No books found"); 
          } else {
            const filteredResults = results.filter((book) => book.imageLinks && book.imageLinks.thumbnail);

            const updatedResults = filteredResults.map((book) => {
              // Assign 'none' shelf to search results initially
              return { ...book, shelf: 'none' };
            });
            setSearchResults(updatedResults);
            setError(null); 
          }
        } catch (err) {
          setSearchResults([]);
          setError("An error occurred while searching."); 
        }
      } else {
        setSearchResults([]);
        setError(null); 
      }
    }, 300), [books]
  );

  const handleSearch = (e) => {
    const queryValue = e.target.value;
    setQuery(queryValue);
    fetchSearchResults(queryValue); 
  };

  useEffect(() => {
    const updateShelfForResults = () => {
      setSearchResults((prevResults) =>
        prevResults.map((book) => {
          const foundBook = books.find((b) => b.id === book.id);
          return foundBook ? { ...book, shelf: foundBook.shelf } : book;
        })
      );
    };

    updateShelfForResults();
  }, [books]);

  const handleUpdateBookShelf = async (book, shelf) => {
    await updateBookShelf(book, shelf);
  };

  const getSelectValue = (book) => {
    return book.shelf || 'none';
  };

  const renderShelfOptions = (book) => {
    const isBookOnShelf = book.shelf !== 'none';
    return (
      <>
        <option value="" disabled>
          {isBookOnShelf ? 'Move to...' : 'Add to...'}
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </>
    );
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={() => window.history.back()}>Close</button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        {error && <div className="search-error">{error}</div>}
        <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : ''})`,
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <select
                      onChange={(e) => handleUpdateBookShelf(book, e.target.value)}
                      value={getSelectValue(book)} // Controlled value
                    >
                      {renderShelfOptions(book)}
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  {book.authors && book.authors.length > 0 ? book.authors.join(', ') : 'Unknown author'}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
