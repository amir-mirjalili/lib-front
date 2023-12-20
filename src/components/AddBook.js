import React, { useState } from 'react';
import axios from 'axios';

const AddBook = ({ onAddBook }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');

    const handleAddBook = () => {
        // Make API call to add book
        axios.post('http://localhost:3001/books', { title, author, genre })
            .then(response => {
                // Assuming the API call is successful, update the state
                onAddBook(response.data.data);
                // Reset form
                setTitle('');
                setAuthor('');
                setGenre('');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Add Book</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            <button onClick={handleAddBook}>Add Book</button>
        </div>
    );
};
export default AddBook;
