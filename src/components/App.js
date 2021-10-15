import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";

import history from "../history";
import CryptoList from "./CryptoList";
import PaginationBar from "./PaginationBar";

const App = () => {
  return (
    <>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={CryptoList} />
          <Route path="/page=:page" component={CryptoList} />
        </Switch>
        <PaginationBar />
      </Router>
    </>
  );
};

export default App;
