import React from "react";
import CryptoList from "./CryptoList";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

const WatchList = (props) => {
  const { isSignedIn, userId } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const { ids } = useSelector((state) => state.watchlist);

  //display message for watchlist when signed out
  if (!isSignedIn) {
    return (
      <div className={`${theme.classes.bg}`} style={{ minHeight: "70vh" }}>
        <Container className="pt-5" fluid="xl">
          <h2 className={`my-0 ${theme.classes.text} text-center`}>
            Please Log In to use watchlist.
          </h2>
        </Container>
      </div>
    );
  }

  //display message for watchlist when it is empty
  if (isSignedIn && ids.length === 0) {
    return (
      <div className={`${theme.classes.bg}`} style={{ minHeight: "70vh" }}>
        <Container className="pt-5" fluid="xl">
          <h2 className={`${theme.classes.text} text-center`}>
            Your watchlist is empty.
          </h2>
          <h5 className={`my-0 ${theme.classes.text} text-center`}>
            Click the star icons next to your favorite coins to add them to your
            watchlist.
          </h5>
        </Container>
      </div>
    );
  }

  return (
    <CryptoList
      history={props.history}
      location={props.location}
      match={props.match}
      isWatchList={true}
    />
  );
};

export default WatchList;
