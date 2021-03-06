import React, { useState } from "react";
import { useEffect } from "react";
import coingeckoglobal from "../apis/coingeckoglobal";
import { formatCurrency } from "@coingecko/cryptoformat";
import { formatPercentage } from "../helpers";
import "../styles/GlobalInfo.css";

const GlobalInfo = () => {
  const [globalData, setGlobalData] = useState(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      const response = await coingeckoglobal.get();
      setGlobalData(response.data.data);
    };
    fetchGlobalData();
  }, []);

  if (globalData !== null) {
    return (
      <div className="d-flex flex-wrap py-2 global-data">
        <div className="me-3">
          <span className="fw-bold me-1">Coins:</span>
          <span>{globalData.active_cryptocurrencies}</span>
        </div>
        <div className="me-3">
          <span className="fw-bold me-1">Markets:</span>
          <span>{globalData.markets}</span>
        </div>
        <div className="me-3">
          <span className="fw-bold me-1">Market Cap:</span>
          <span>
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
              {formatPercentage(
                globalData.market_cap_change_percentage_24h_usd
              )}
            </div>
          </span>
        </div>
        <div className="me-3">
          <span className="fw-bold me-1">24h Vol:</span>
          <span>
            {formatCurrency(globalData.total_volume.usd, "USD", "en")}
          </span>
        </div>
        <div className="me-3">
          <span className="fw-bold me-1">Dominance:</span>
          <span>
            <div className="d-inline me-1">
              BTC {formatPercentage(globalData.market_cap_percentage.btc)}
            </div>
            <div className="d-inline me-1">
              ETH {formatPercentage(globalData.market_cap_percentage.eth)}
            </div>
          </span>
        </div>
      </div>
    );
  } else {
    return <div className="py-1" style={{ height: "34px" }}></div>;
  }
};

export default GlobalInfo;
