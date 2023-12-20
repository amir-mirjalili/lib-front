import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HomeContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
`;

const WelcomeText = styled.h2`
  color: #333;
  font-size: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const StyledButton = styled(Link)`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <WelcomeText>Welcome to the Library App</WelcomeText>
      <ButtonContainer>
        <StyledButton to="/view">View Books</StyledButton>
        <StyledButton to="/add">Add Book</StyledButton>
      </ButtonContainer>
    </HomeContainer>
  );
};

export default Home;
