import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AddBookContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
`;

const AddButton = styled.button`
  background-color: #2ecc71;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 15px;
`;

const AddBook = ({ onAddBook }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [error, setError] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleAddBook = () => {
    setError("");

    // Make API call to add book
    axios
      .post(`${apiUrl}/books`, { title, author, genre })
      .then((response) => {
        onAddBook(response.data.data);
        setTitle("");
        setAuthor("");
        setGenre("");
        navigate("/view");
      })
      .catch((error) => {
        console.error(error);
        setError(error.response?.data?.msg);
      });
  };

  return (
    <AddBookContainer>
      <Title>Add Book</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <AddButton onClick={handleAddBook}>Add Book</AddButton>
    </AddBookContainer>
  );
};

export default AddBook;
