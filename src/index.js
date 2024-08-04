import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import { BooksProvider } from '../src/components/BooksContext';

ReactDOM.render(
  <BrowserRouter>
     <BooksProvider>
      <App />
    </BooksProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
