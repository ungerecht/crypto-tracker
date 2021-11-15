import React from "react";
import { Pagination } from "react-bootstrap";
import history from "../history";
import "../styles/PaginationBar.css";

const PaginationBar = ({ page, pages }) => {
  const createPagination = () => {
    const onFirst = page === 1;
    const onLast = page === pages;
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
    for (let i = 1; i <= pages; i++) {
      if (i === 1 || i === pages || (i >= page - 5 && i <= page + 5)) {
        if ((i === page - 5 && i !== 1) || (i === page + 5 && i !== pages)) {
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
