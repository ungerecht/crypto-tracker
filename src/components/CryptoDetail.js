import React from "react";
import { useEffect, useState } from "react";
import coingecko from "../apis/coingecko";
import CoinStats from "./CoinStats";
import CoinInfo from "./CoinInfo";
import CoinChart from "./CoinChart";
import {
  Container,
  Row,
  Col,
  Card,
  Placeholder,
  ListGroup,
} from "react-bootstrap";
import "../styles/CryptoDetail.css";
import { useSelector } from "react-redux";

const CryptoDetail = (props) => {
  const { theme } = useSelector((state) => state.theme);
  const coinId = props.match.params.id;
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const fetchCoinDetail = async () => {
      const response = await coingecko.get(coinId);
      setCoin(response.data);
    };
    fetchCoinDetail();
  }, [coinId]);

  if (coin !== null) {
    return (
      <div className={`${theme.classes.bg} ${theme.classes.text}`}>
        <Container fluid="lg">
          <Row>
            <Col className="info-column pt-4">
              <CoinInfo coin={coin} theme={theme}></CoinInfo>
            </Col>
            <Col>
              <CoinStats coin={coin} theme={theme}></CoinStats>
            </Col>
          </Row>
          <Row>
            <Col>
              <CoinChart coin={coin} theme={theme}></CoinChart>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card
                className="mt-3"
                border={`${theme.mode}`}
                style={{ backgroundColor: theme.darker }}
              >
                <Card.Body>
                  <Card.Title className="fw-bold">About {coin.name}</Card.Title>
                  <div className="px-3">
                    <span className="about-text p-3">
                      {htmlDecode(coin.description.en)}
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div className={`${theme.classes.bg} ${theme.classes.text}`}>
        {renderPlaceholders()}
      </div>
    );
  }
};

const renderPlaceholders = () => {
  return (
    <Container fluid="lg">
      <Row>
        <Col className="info-column pt-4">
          <Placeholder animation="glow">
            <Placeholder xs={1} />
            <br />
            <Placeholder as="h1" xs={5} className="my-3" />
            <br />
            <Placeholder as="h2" xs={4} className="my-2" />
            <br />
            <Placeholder xs={7} className="mt-4 mb-3" />
            <br />
            {renderLinksPlaceholders()}
            <br />
          </Placeholder>
        </Col>
        <Col>
          <Card className="mt-3 bg-light" border="light">
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={3} />
              </Placeholder>
              <ListGroup variant="flush">{renderStatsPlaceholders()}</ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card
            className="mt-3 px-2"
            style={{ height: "650px", width: "100%" }}
          />
        </Col>
      </Row>
    </Container>
  );
};

const renderLinksPlaceholders = () => {
  let placeholders = [];
  for (let i = 0; i < 4; i++) {
    placeholders.push(
      <Placeholder.Button
        key={`link ${i}`}
        xs={2}
        variant="secondary"
        className="me-1 btn-sm"
      />
    );
  }
  return placeholders;
};

const renderStatsPlaceholders = () => {
  let placeholders = [];
  for (let i = 0; i < 7; i++) {
    placeholders.push(
      <Placeholder
        key={`stat ${i}`}
        as={ListGroup.Item}
        className="bg-light px-1"
        animation="glow"
      >
        <Placeholder xs={12} />
      </Placeholder>
    );
  }
  return placeholders;
};

const htmlDecode = (input) => {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
};

export default CryptoDetail;
