import React from "react";
import { connect } from "react-redux";
import { setActive, fetchCoins } from "../actions";
import { Pagination } from "react-bootstrap";
import history from "../history";
import "../styles/PaginationBar.css";

class PaginationBar extends React.Component {
  componentDidMount() {
    this.props.fetchCoins();
  }

  createPagination = () => {
    console.log("poop");
    let items = [];
    for (let i = 1; i < this.props.numberOfCoins / 20; i++) {
      items = [
        ...items,
        <Pagination.Item
          key={i}
          active={i === this.props.active}
          onClick={() => {
            this.props.setActive(i);
            history.push(`/page=${i}`);
          }}
        >
          {i}
        </Pagination.Item>,
      ];
    }
    return items;
  };

  render() {
    return (
      <div>
        <Pagination size="sm">
          <Pagination.Prev />
          {this.createPagination()}
          <Pagination.Ellipsis />
          <Pagination.Next />
        </Pagination>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    active: state.page.active,
    numberOfCoins: state.page.number,
  };
};

export default connect(mapStateToProps, { fetchCoins, setActive })(
  PaginationBar
);
