import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AddBook from "./components/AddBook";
import ViewBooks from "./components/ViewBooks";
import { GlobalStyle } from "./styles";
import EditBook from "./components/EditBook";

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const handleAddBook = (newBook) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route
          path="/add"
          element={<AddBook onAddBook={handleAddBook} setError={setError} />}
        />
        <Route
          path="/view"
          element={
            <ViewBooks books={books} error={error} setError={setError} />
          }
        />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </Router>
  );
}

export default App;
