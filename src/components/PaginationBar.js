import React from "react";
import { connect } from "react-redux";
import { setActive } from "../actions";
import { Pagination } from "react-bootstrap";
import history from "../history";
import "../styles/PaginationBar.css";

class PaginationBar extends React.Component {
  createPagination = () => {
    const onFirst = this.props.active === 1;
    const onLast =
      this.props.active === Math.ceil(this.props.numberOfCoins / 20);
    return (
      <Pagination size="sm">
        <Pagination.Prev
          disabled={onFirst}
          onClick={() => {
            history.push(`/page=${this.props.active - 1}`);
          }}
        />
        {this.createItems()}
        <Pagination.Next
          disabled={onLast}
          onClick={() => {
            history.push(`/page=${this.props.active + 1}`);
          }}
        />
      </Pagination>
    );
  };

  createItems = () => {
    let items = [];
    const amountOfPages = Math.ceil(this.props.numberOfCoins / 20);
    for (let i = 1; i <= amountOfPages; i++) {
      if (
        i === 1 ||
        i === amountOfPages ||
        (i >= this.props.active - 5 && i <= this.props.active + 5)
      ) {
        if (
          (i === this.props.active - 5 && i !== 1) ||
          (i === this.props.active + 5 && i !== amountOfPages)
        ) {
          items = [...items, <Pagination.Ellipsis key={i} disabled />];
        } else {
          items = [
            ...items,
            <Pagination.Item
              key={i}
              active={i === this.props.active}
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

  render() {
    return (
      <div className="d-flex justify-content-center">
        {this.createPagination()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    active: state.page.active,
    numberOfCoins: state.coins.number,
  };
};

export default connect(mapStateToProps, { setActive })(PaginationBar);
