import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGlobalData } from "../actions";
import { formatCurrency } from "@coingecko/cryptoformat";
import { formatPercentage, formatSupply } from "../helpers";
import "../styles/GlobalInfo.css";

const GlobalInfo = () => {
  const { globalData } = useSelector((state) => state.info);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGlobalData());
  }, [dispatch]);

  if (Object.keys(globalData).length !== 0) {
    return (
      <div className="d-flex py-1">
        <span className="fw-bold me-1">Coins:</span>
        <span className="me-3">{globalData.active_cryptocurrencies}</span>
        <span className="fw-bold me-1">Markets:</span>
        <span className="me-3">{globalData.markets}</span>
        <span className="fw-bold me-1">Market Cap:</span>
        <span className="me-3">
          {formatCurrency(globalData.total_market_cap.usd, "USD", "en")}
          <div
            className="d-inline ps-1"
            style={{
              color:
                globalData.market_cap_change_percentage_24h_usd >= 0
                  ? "limegreen"
                  : "red",
            }}
          >
            {formatPercentage(globalData.market_cap_change_percentage_24h_usd)}
          </div>
        </span>
        <span className="fw-bold me-1">24h Vol:</span>
        <span className="me-3">
          {formatCurrency(globalData.total_volume.usd, "USD", "en")}
        </span>
        <span className="fw-bold me-1">Dominance:</span>
        <span className="me-3">
          <div className="d-inline me-1">
            BTC {formatPercentage(globalData.market_cap_percentage.btc)}
          </div>
          <div className="d-inline me-1">
            ETH {formatPercentage(globalData.market_cap_percentage.eth)}
          </div>
        </span>
      </div>
    );
  } else {
    return <div className="py-1" style={{ height: "26px" }}></div>;
  }
};

export default GlobalInfo;
