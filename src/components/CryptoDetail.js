import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetail } from "../actions";
import Stats from "./Stats";
import Info from "./Info";
import Chart from "./Chart";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/CryptoDetail.css";

const CryptoDetail = (props) => {
  const { coin } = useSelector((state) => state.coin);
  const dispatch = useDispatch();
  const coinId = props.match.params.id;

  useEffect(() => {
    dispatch(fetchCoinDetail(coinId));
  }, [dispatch, coinId]);

  if (coin.id) {
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
                  <span className="about-text p-3">{htmlDecode(coin.description.en)}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <div></div>;
  }
};

const htmlDecode = (input) => {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

export default CryptoDetail;
