import React from 'react';

const DeleteBook = ({ id, onDelete }) => {
    const handleDelete = () => {
        // Implement your delete logic here
        onDelete(id);
    };

    return (
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: '#fff' }}>
            Delete
        </button>
    );
};

export default DeleteBook;
