import React from 'react';

const BookShelf = ({ title, books, onUpdateBookShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail : ''}")`
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                  <select 
                      value={book.shelf || "none"} //Default to "none" if book.shelf is undefined or null
                      onChange={e => onUpdateBookShelf(book, e.target.value)}
                    >
                      <option disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.join(', ')}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
