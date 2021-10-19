import React from "react";
import { Form, InputGroup, Button, FormControl } from "react-bootstrap";
import { searchIcon } from "../icons";
import "../styles/SearchBar.css";

const SearchBar = () => {
  return (
    <Form className="search">
      <InputGroup>
        <FormControl type="search" placeholder="Search" size="sm" />
        <Button
          variant="secondary"
          className="searchBtn d-flex align-items-center justify-content-center p-0"
        >
          {searchIcon}
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
