import React from "react";
import { useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";
import history from "../history";
import "../styles/PaginationBar.css";

const PaginationBar = ({ page }) => {
  const numberOfCoins = useSelector((state) => state.coins.number);

  const createPagination = () => {
    const onFirst = page === 1;
    const onLast = page === Math.ceil(numberOfCoins / 100);
    return (
      <Pagination size="sm">
        <Pagination.Prev
          disabled={onFirst}
          onClick={() => {
            history.push(`/page=${page - 1}`);
          }}
        />
        {createItems()}
        <Pagination.Next
          disabled={onLast}
          onClick={() => {
            history.push(`/page=${page + 1}`);
          }}
        />
      </Pagination>
    );
  };

  const createItems = () => {
    let items = [];
    const amountOfPages = Math.ceil(numberOfCoins / 100);
    for (let i = 1; i <= amountOfPages; i++) {
      if (i === 1 || i === amountOfPages || (i >= page - 5 && i <= page + 5)) {
        if (
          (i === page - 5 && i !== 1) ||
          (i === page + 5 && i !== amountOfPages)
        ) {
          items = [...items, <Pagination.Ellipsis key={i} disabled />];
        } else {
          items = [
            ...items,
            <Pagination.Item
              key={i}
              active={i === page}
              onClick={() => {
                history.push(`/page=${i}`);
              }}
            >
              {i}
            </Pagination.Item>,
          ];
        }
      }
    }
    return items;
  };

  return (
    <div className="d-flex justify-content-center">{createPagination()}</div>
  );
};

export default PaginationBar;
