// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddBook from './components/AddBook';
import ViewBooks from './components/ViewBooks';
import { GlobalStyle } from './styles';

function App() {
    return (
        <Router>
            <GlobalStyle />
            <Routes>
                <Route path="/add" element={<AddBook />} />
                <Route path="/view" element={<ViewBooks />} />
            </Routes>
        </Router>
    );
}

export default App;
