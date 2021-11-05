import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetail } from "../actions";
import Stats from "./Stats";
import Info from "./Info";
import Chart from "./Chart";
import {
  Container,
  Row,
  Col,
  Card,
  Placeholder,
  ListGroup,
} from "react-bootstrap";
import "../styles/CryptoDetail.css";

const CryptoDetail = (props) => {
  const { coin } = useSelector((state) => state.coins);
  const dispatch = useDispatch();
  const coinId = props.match.params.id;

  useEffect(() => {
    dispatch(fetchCoinDetail(coinId));
  }, [dispatch, coinId]);

  if (coin.id) {
    //if (false) {
    return (
      <Container fluid="lg">
        <Row>
          <Col className="info-column pt-4">
            <Info coin={coin}></Info>
          </Col>
          <Col>
            <Stats coin={coin}></Stats>
          </Col>
        </Row>
        <Row>
          <Col>
            <Chart coin={coin}></Chart>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card className="mt-3 bg-light" border="light">
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
    );
  } else {
    return renderPlaceholders();
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
          <Card className="mt-3 px-2">
            <Placeholder as={Card.Body} animation="glow">
              <Placeholder
                as="div"
                className="d-flex justify-content-center mb-5"
                animation="glow"
              >
                <Placeholder as={Card.Title} xs={2} />
              </Placeholder>
              <Placeholder
                as="div"
                style={{ height: "650px", width: "100%" }}
              />
            </Placeholder>
          </Card>
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
