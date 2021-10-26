import React from "react";

import {
  Col,
  Badge,
  Button,
  ProgressBar,
  ButtonToolbar,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

import { upIcon, downIcon, starIcon } from "../icons";
import { formatPercentage } from "../helpers";
import { formatCurrency } from "@coingecko/cryptoformat";

const Info = ({ coin }) => {
  return renderInfo(coin);
};

const renderInfo = (coin) => {
  return (
    <>
      <Badge className="bg-dark p-1">{`Rank #${coin.market_cap_rank}`}</Badge>
      <span className="d-flex align-items-center my-3">
        <img
          src={coin.image.large}
          width="36px"
          alt={coin.name + " icon"}
          className="me-3"
        />
        <h2 className="mb-1 text-nowrap">{coin.name}</h2>
        <h4 className="mb-0 mx-2 text-muted">{coin.symbol.toUpperCase()}</h4>
        <Button
          variant="outline-dark"
          className="bg-light text-dark d-flex p-2 "
        >
          {starIcon}
        </Button>
      </span>
      {renderPrice(coin)}
      {renderLinks(coin)}
    </>
  );
};

const renderPrice = (coin) => {
  if (coin.market_data.current_price.usd) {
    return (
      <Col className="price-column">
        <span className="d-flex align-items-center">
          <span className="h2 mb-1">
            {formatCurrency(coin.market_data.current_price.usd, "USD", "en")}
          </span>
          <Badge
            className="p-2 ms-3"
            style={{
              background:
                coin.market_data.price_change_percentage_24h >= 0
                  ? "limegreen"
                  : "red",
            }}
          >
            <span className="d-flex align-items-center percentage-badge">
              {coin.market_data.price_change_percentage_24h >= 0
                ? upIcon
                : downIcon}
              {formatPercentage(
                Math.abs(coin.market_data.price_change_percentage_24h)
              )}
            </span>
          </Badge>
        </span>
        <span className="d-flex justify-content-center range-bar mt-2">
          <span className="fw-bold text-muted range-text">24 Hour Range</span>
        </span>
        <span className="d-flex align-items-center range-bar">
          <span className="d-flex fw-bold text-muted pe-2 range-text">
            {formatCurrency(coin.market_data.low_24h.usd, "USD", "en")}
          </span>
          <ProgressBar
            min={0}
            max={coin.market_data.high_24h.usd - coin.market_data.low_24h.usd}
            now={
              coin.market_data.high_24h.usd -
              coin.market_data.low_24h.usd -
              (coin.market_data.high_24h.usd -
                coin.market_data.current_price.usd)
            }
            variant="info"
            style={{ height: "10px", width: "500px" }}
          />
          <span className="d-flex fw-bold text-muted ps-2 range-text">
            {formatCurrency(coin.market_data.high_24h.usd, "USD", "en")}
          </span>
        </span>
      </Col>
    );
  }
};

const renderLinks = (coin) => {
  return (
    <Col className="links-column">
      <ButtonToolbar className="mt-3">
        {renderLink(
          coin.links.homepage[0],
          stripDomain(coin.links.homepage[0])
        )}
        {renderExplorers(coin)}
        {renderCommunities(coin.links)}
        {renderLink(coin.links.repos_url.github[0], "Source Code")}
      </ButtonToolbar>
      {renderTags(coin.categories)}
    </Col>
  );
};

const renderLink = (link, name) => {
  if (link) {
    return (
      <Button
        variant="secondary"
        size="sm"
        className="me-1 mb-1 links-button"
        href={link}
        target="_blank"
      >
        {name}
      </Button>
    );
  }
};

const renderCommunities = (links) => {
  let communities = [];
  if (links.subreddit_url) {
    communities = [
      ...communities,
      <Dropdown.Item
        key="reddit"
        variant="secondary"
        className="links-button"
        href={links.subreddit_url}
        target="_blank"
      >
        Reddit
      </Dropdown.Item>,
    ];
  }
  if (links.facebook_username) {
    communities = [
      ...communities,
      <Dropdown.Item
        key="facebook"
        variant="secondary"
        className="me-1 mb-1 links-button"
        href={`https://www.facebook.com/${links.facebook_username}`}
        target="_blank"
      >
        Facebook
      </Dropdown.Item>,
    ];
  }
  if (links.twitter_screen_name) {
    communities = [
      ...communities,
      <Dropdown.Item
        key="twitter"
        variant="secondary"
        className="me-1 mb-1 links-button"
        href={`https://www.twitter.com/${links.twitter_screen_name}`}
        target="_blank"
      >
        Twitter
      </Dropdown.Item>,
    ];
  }
  if (links.official_forum_url[0] !== "") {
    communities = [
      ...communities,
      <Dropdown.Item
        key="forum"
        variant="secondary"
        className="me-1 mb-1 links-button"
        href={links.official_forum_url[0]}
        target="_blank"
      >
        {stripDomain(links.official_forum_url[0])}
      </Dropdown.Item>,
    ];
  }
  if (communities.length > 0) {
    return (
      <DropdownButton
        variant="secondary"
        title="Communities"
        size="sm"
        className="mb-1 me-1 links-button"
      >
        {communities}
      </DropdownButton>
    );
  }
};

const renderExplorers = (coin) => {
  //filter empty values
  const filtered = coin.links.blockchain_site.filter((explorer) => {
    return explorer.length !== 0;
  });
  const explorers = filtered.map((explorer) => {
    return (
      <Dropdown.Item
        key={explorer}
        variant="secondary"
        className="links-button"
        href={explorer}
        target="_blank"
      >
        {stripHost(stripDomain(explorer))}
      </Dropdown.Item>
    );
  });
  if (explorers.length > 0) {
    return (
      <DropdownButton
        variant="secondary"
        title="Explorers"
        size="sm"
        className="mb-1 me-1 links-button"
      >
        {explorers}
      </DropdownButton>
    );
  }
};

const renderTags = (categories) => {
  const tags = categories.map((category) => {
    return (
      <Badge key={category} className="bg-light text-dark me-1">
        {category}
      </Badge>
    );
  });
  return tags;
};

const stripDomain = (url) => {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .replace("www.", "")
    .split(/[/?#]/)[0];
};

const stripHost = (domain) => {
  domain = domain.replace(".com", "").replace(".io", "").replace(".org", "");
  if (domain.indexOf(".")) {
    domain = domain.substring(domain.indexOf(".") + 1);
  }
  return domain.charAt(0).toUpperCase() + domain.slice(1);
};

export default Info;
