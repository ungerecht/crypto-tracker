import React from "react";
import { Col, Row, Card, ListGroup } from "react-bootstrap";
import { formatSupply } from "../helpers";
import { formatCurrency } from "@coingecko/cryptoformat";

const CoinStats = ({ coin, theme }) => {
  return renderStats(coin, theme);
};

const renderStats = (coin, theme) => {
  return (
    <Card
      className="mt-3"
      border={`${theme.mode}`}
      style={{ backgroundColor: theme.darker }}
    >
      <Card.Body className="fw-bold">
        <Card.Title className="fw-bold">{coin.name} Statistics</Card.Title>
        <ListGroup variant="flush">
          {renderStatsItem(
            "Market Cap",
            coin.market_data.market_cap.usd,
            true,
            theme
          )}
          {renderStatsItem(
            "24 Hour Trading Volume",
            coin.market_data.total_volume.usd,
            true,
            theme
          )}
          {renderStatsItem(
            "Fully Diluted Valuation",
            coin.market_data.fully_diluted_valuation.usd,
            true,
            theme
          )}
          {renderStatsItem(
            "Circulating Supply",
            coin.market_data.circulating_supply,
            false,
            theme
          )}
          {renderStatsItem(
            "Total Supply",
            coin.market_data.total_supply,
            false,
            theme
          )}
          {renderStatsItem(
            "Max Supply",
            coin.market_data.max_supply,
            false,
            theme
          )}
          {renderStatsItem(
            "All Time High",
            coin.market_data.ath.usd,
            true,
            theme
          )}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

const renderStatsItem = (title, data, isCurrency, theme) => {
  if (data !== undefined)
    return (
      <ListGroup.Item
        className={` ${theme.classes.text}`}
        style={{ backgroundColor: theme.darker }}
      >
        <Row className="flex-nowrap">
          <Col className={`d-flex data-label text-muted text-nowrap px-0`}>
            {title}
          </Col>
          <Col className="d-flex justify-content-end px-0">
            {isCurrency
              ? formatCurrency(data, "USD", "en")
              : formatSupply(data)}
          </Col>
        </Row>
      </ListGroup.Item>
    );
};

export default CoinStats;
