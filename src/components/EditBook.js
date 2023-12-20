import React from 'react';

const EditBook = ({ id, onEdit }) => {
    const handleEdit = () => {
        onEdit(id);
    };

    return (
        <button onClick={handleEdit} style={{ backgroundColor: 'green', color: '#fff' }}>
            Edit
        </button>
    );
};

export default EditBook;
