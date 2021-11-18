import React from "react";
import { Navbar, Nav, Container, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWatchlist, clearWatchlist } from "../actions";
import SearchBar from "./SearchBar";
import GoogleAuth from "./GoogleAuth";
import GlobalInfo from "./GlobalInfo";
import ThemeButton from "./ThemeButton";
import "../styles/Header.css";
import watchlists from "../apis/watchlists";

const Header = () => {
  const { theme } = useSelector((state) => state.theme);
  const { isSignedIn, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const makeWatchlist = async () => {
      await watchlists.post("", { coins: [], id: userId });
    };

    const checkWatchlistExists = async () => {
      const response = await watchlists.get();
      if (response.data.some((wl) => wl.id === userId)) {
        //user watchlist exists so fetch it
        dispatch(getWatchlist());
      } else {
        //user watchlist does not exist to create it
        makeWatchlist();
      }
    };

    if (isSignedIn) {
      //logging in
      checkWatchlistExists();
    } else {
      //logging out and clear watchlist
      dispatch(clearWatchlist());
    }
  }, [dispatch, isSignedIn, userId]);

  return (
    <div className={`${theme.classes.bg} ${theme.classes.text}`}>
      <Container
        fluid="lg"
        className={`d-flex justify-content-end py-3`}
        style={{ height: "64px" }}
      >
        <GoogleAuth />
        <ThemeButton />
      </Container>
      <hr className="my-0" />
      <Navbar className="py-0" variant={theme.mode}>
        <Container fluid="lg" className="flex-wrap py-3 align-items-center">
          <Navbar.Brand className="me-4 pt-0 pb-1 fw-bold" href="/">
            CryptoTracker
          </Navbar.Brand>
          <Nav className="d-flex flex-grow-1 py-0 justify-content-center justify-content-sm-start">
            <Nav.Link
              className={`fw-bold p-0 me-4 ${theme.classes.text}`}
              href="/"
            >
              Coins
            </Nav.Link>
            <Nav.Link
              className={`fw-bold p-0 ${theme.classes.text}`}
              href="/watchlist"
            >
              Watchlist
            </Nav.Link>
          </Nav>
          <Col>
            <SearchBar />
          </Col>
        </Container>
      </Navbar>
      <hr className="my-0" />
      <Container fluid="lg">
        <GlobalInfo />
      </Container>
      <hr className="my-0" />
    </div>
  );
};

export default Header;
