import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCoins } from "../actions";
import history from "../history";
import { searchIcon } from "../icons";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const { coins } = useSelector((state) => state.coins);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const handleSearch = (query) => {
    setIsLoading(true);

    const options = coins.filter(({ name }) =>
      name.toLowerCase().startsWith(query.toLowerCase())
    );

    options.sort((a, b) => a.name.length - b.name.length);

    setOptions(options);
    setIsLoading(false);
  };

  return (
    <Typeahead
      id="search"
      isLoading={isLoading}
      labelKey="name"
      minLength={3}
      highlightOnlyResult
      onInputChange={handleSearch}
      onChange={(option) => {
        if (option[0].id) {
          history.push(`/coin/${option[0].id}`);
        }
      }}
      options={options}
      placeholder="Search"
      renderMenuItemChildren={(option) => <span>{option.name}</span>}
    />
  );
};

export default SearchBar;
