import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/books/${id}`)
      .then((response) => {
        const { title, author, genre } = response.data.data;
        setTitle(title);
        setAuthor(author);
        setGenre(genre);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleUpdateBook = () => {
    axios
      .put(`http://localhost:3001/books/${id}`, { title, author, genre })
      .then((response) => {
        console.log("Book updated successfully");
        // Redirect to the view page after successful update
        navigate("/view");
      })
      .catch((error) => console.error("Error updating book", error));
  };

  return (
    <Container>
      <h2>Edit Book</h2>
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
      <Button onClick={handleUpdateBook}>Update Book</Button>
    </Container>
  );
};

export default EditBook;
