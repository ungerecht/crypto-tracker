import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import history from "../history";
import CryptoList from "./CryptoList";

const App = () => {
  return (
    <>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={CryptoList} />
          <Route path="/page=:page" component={CryptoList} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
