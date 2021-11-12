import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import coingecko from "../apis/coingecko";
import PaginationBar from "./PaginationBar";
import { Container, Placeholder } from "react-bootstrap";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { formatPercentage, formatSupply } from "../helpers";
import { formatCurrency } from "@coingecko/cryptoformat";
import "../styles/CryptoList.css";
import BootstrapTable from "react-bootstrap-table-next";

const CryptoList = (props) => {
  const columns = [
    {
      dataField: "market_cap_rank",
      text: "#",
      sort: true,
      headerStyle: {
        width: "40px",
      },
    },
    {
      dataField: "name",
      text: "Coin",
      sort: true,
      formatter: nameFormatter,
      classes: "name-block",
      headerClasses: "ps-4",
    },
    {
      dataField: "current_price",
      text: "Price",
      sort: true,
      formatter: priceFormatter,
      classes: "text-end",
      headerClasses: "text-end",
    },
    {
      dataField: "price_change_percentage_1h_in_currency",
      text: "1d",
      sort: true,
      formatter: percentageFormatter,
      classes: "text-end",
      headerClasses: "text-end",
    },
    {
      dataField: "price_change_percentage_24h_in_currency",
      text: "24h",
      sort: true,
      formatter: percentageFormatter,
      classes: "text-end",
      headerClasses: "text-end",
    },
    {
      dataField: "price_change_percentage_7d_in_currency",
      text: "7d",
      sort: true,
      formatter: percentageFormatter,
      classes: "text-end",
      headerClasses: "text-end",
    },
    {
      dataField: "market_cap",
      text: "Market Cap",
      sort: true,
      formatter: priceFormatter,
      classes: "text-end",
      headerClasses: "text-end",
    },
    {
      dataField: "circulating_supply",
      text: "Circulating Supply",
      sort: true,
      formatter: supplyFormatter,
      classes: "text-end",
      headerClasses: "text-end",
    },
    {
      dataField: "sparkline_7d",
      text: "Last 7 Days",
      sort: true,
      sortFunc: (a, b, order, dataField, rowA, rowB) => {
        if (order === "asc")
          return (
            rowA.price_change_percentage_7d_in_currency -
            rowB.price_change_percentage_7d_in_currency
          );
        else
          return (
            rowB.price_change_percentage_7d_in_currency -
            rowA.price_change_percentage_7d_in_currency
          );
      },
      formatter: chartFormatter,
      headerClasses: "text-center px-3",
      headerStyle: {
        width: "151px",
      },
    },
  ];

  const pageId = parseInt(props.match.params.page, 10);
  const [page, setPage] = useState(pageId ? pageId : 1);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const response = await coingecko.get("/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          page,
          sparkline: true,
          price_change_percentage: "24h,7d,1h",
        },
      });
      setCoins(response.data);
    };
    fetchCoins();
  }, [page]);

  return (
    <Container className="pt-5" fluid="xl">
      <BootstrapTable
        bootstrap4
        keyField="name"
        data={coins}
        columns={columns}
        hover={true}
        bordered={false}
        wrapperClasses="table-responsive-lg"
        headerWrapperClasses="sticky-top"
        rowStyle={{ height: "68px" }}
        noDataIndication={renderTablePlaceholders()}
      />
      <PaginationBar page={page} setPage={setPage} />
    </Container>
  );
};

const nameFormatter = (cell, row) => {
  return (
    <Link to={`/coin/${row.id}`} className="text-decoration-none text-black">
      <div className="d-flex align-items-center">
        <img
          src={row.image}
          width="20px"
          alt={cell + " icon"}
          className="me-3"
        />
        <strong className="col-3 me-5 d-none d-lg-inline">{cell}</strong>
        <strong className="d-inline d-lg-none">
          {row.symbol.toUpperCase()}
        </strong>
        <small className="ms-2 d-none d-lg-inline">
          {row.symbol.toUpperCase()}
        </small>
      </div>
    </Link>
  );
};

const priceFormatter = (cell) => {
  return formatCurrency(cell, "USD", "en");
};

const percentageFormatter = (cell) => {
  return (
    <div
      style={{
        color: cell >= 0 ? "limegreen" : "red",
      }}
    >
      {formatPercentage(cell)}
    </div>
  );
};

const supplyFormatter = (cell, row) => {
  return formatSupply(cell);
};

const chartFormatter = (cell, row) => {
  return (
    <Link to={`/coin/${row.id}`} className="text-decoration-none text-black">
      <Sparklines
        data={row.sparkline_in_7d.price}
        svgHeight={50}
        svgWidth={135}
      >
        <SparklinesLine
          color={
            row.sparkline_in_7d.price[0] <=
            row.sparkline_in_7d.price[row.sparkline_in_7d.price.length - 1]
              ? "limegreen"
              : "red"
          }
          style={{ fill: "none" }}
        />
      </Sparklines>
    </Link>
  );
};

const renderTablePlaceholders = () => {
  let placeholders = [];
  for (let i = 0; i < 50; i++) {
    placeholders.push(
      <React.Fragment key={`row ${i}`}>
        <div style={{ height: "68px" }} className=" d-flex align-items-center">
          <Placeholder
            as="div"
            animation="glow"
            style={{ height: "100%", width: "100%" }}
            className="d-flex align-items-center mx-2"
          >
            <Placeholder size="lg" style={{ width: "100%" }} />
          </Placeholder>
        </div>
        <hr className="m-0" />
      </React.Fragment>
    );
  }
  return placeholders;
};

export default CryptoList;
