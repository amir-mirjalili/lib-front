import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import styled from 'styled-components';
import DeleteBook from "./DeleteBook";
import EditBook from "./EditBook";

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

const ViewBooks = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handleEdit = (id) => {
        console.log(`Edit book with ID ${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Delete book with ID ${id}`);
    };
    const columns = React.useMemo(
        () => [
            { Header: 'ID', accessor: 'id' },
            { Header: 'Title', accessor: 'title' },
            { Header: 'Author', accessor: 'author' },
            { Header: 'Genre', accessor: 'genre' },
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ row }) => (
                    <ActionContainer>
                        <EditBook id={row.original.id} onEdit={handleEdit} />
                        <DeleteBook id={row.original.id} onDelete={handleDelete} />
                    </ActionContainer>
                ),
            },
        ],
        []
    );

    const data = React.useMemo(() => books, [books]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    useEffect(() => {
        axios.get('http://localhost:3001/books',{ params: { page, pageSize } })
            .then(response => setBooks(response.data.data.data))
            .catch(error => console.error(error));
    }, [page, pageSize]);

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
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
                </tbody>
            </Table>
            <PaginationContainer>
                <PaginationButton onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
                    Previous
                </PaginationButton>
                <span> Page {page} </span>
                <PaginationButton onClick={() => setPage((prev) => prev + 1)}>
                    Next
                </PaginationButton>
            </PaginationContainer>
        </Container>
    );
};

export default ViewBooks;
