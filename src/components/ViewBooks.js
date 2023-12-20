import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import styled from "styled-components";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border: 1px solid #ddd;

  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const SearchInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const PaginationButton = styled.button`
  padding: 8px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ConfirmDialog = styled.div`
  /* Styles for the confirmation dialog */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  z-index: 1000;
`;

const DeleteButton = styled.button`
  padding: 8px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [error, setError] = useState(null);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const handleDelete = (id) => {
    setBookToDelete(id);
    setDeleteConfirmationVisible(true);
  };

  const handleDeleteConfirmation = () => {
    axios
      .delete(`${apiUrl}/books/${bookToDelete}`)
      .then(() => {
        console.log("Book deleted successfully");
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting book", error);
        setError(error.response.data.msg);
      })
      .finally(() => {
        setBookToDelete(null);
        setDeleteConfirmationVisible(false);
      });
  };

  const fetchData = () => {
    axios
      .get(`${apiUrl}/books`, {
        params: {
          page,
          pageSize,
        },
      })
      .then((response) => setBooks(response.data.data.data))
      .catch((error) => console.error(error));
  };

  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Title", accessor: "title" },
      { Header: "Author", accessor: "author" },
      { Header: "Genre", accessor: "genre" },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <ActionContainer>
            <Link to={`/edit/${row.original.id}`}>Edit</Link>
            <DeleteButton onClick={() => handleDelete(row.original.id)}>
              Delete
            </DeleteButton>{" "}
          </ActionContainer>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => books, [books]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    axios
      .get(`${apiUrl}/books/search`, {
        params: {
          page,
          pageSize,
          title: search,
          author: search,
          genre: search,
        },
      })
      .then((response) => {
        setBooks(response.data.data.data);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError(error.response.data.msg);
      });
  }, [page, pageSize, search]);

  return (
    <Container>
      <h2>View Books</h2>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <PaginationContainer>
        <PaginationButton
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </PaginationButton>
        <span> Page {page} </span>
        <PaginationButton onClick={() => setPage((prev) => prev + 1)}>
          Next
        </PaginationButton>
      </PaginationContainer>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isDeleteConfirmationVisible && (
        <ConfirmDialog>
          <p>Are you sure you want to delete this book?</p>
          <button onClick={handleDeleteConfirmation}>Confirm</button>
          <button onClick={() => setDeleteConfirmationVisible(false)}>
            Cancel
          </button>
        </ConfirmDialog>
      )}
    </Container>
  );
};

export default ViewBooks;
