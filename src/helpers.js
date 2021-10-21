import { formatCurrency } from "@coingecko/cryptoformat";

export const formatCoins = (coins) => {
  for (let i = 0; i < coins.length; i++) {
    formatCoinMarket(coins[i]);
  }
  return coins;
};

export const formatCoinMarket = (coin) => {
  //make symbol uppercase
  coin.symbol = coin.symbol.toUpperCase();

  //format price
  coin.current_price = formatCurrency(coin.current_price, "USD", "en");

  //format 24h price change %
  coin.price_change_percentage_24h = formatData(
    coin.price_change_percentage_24h,
    2
  );

  //format 7d price change %
  coin.price_change_percentage_7d_in_currency = formatData(
    coin.price_change_percentage_7d_in_currency,
    2
  );

  //format market cap
  coin.market_cap = formatCurrency(coin.market_cap, "USD", "en", false, true);

  //format circulating supply
  coin.circulating_supply = formatData(coin.circulating_supply, 0);
};

const formatData = (data, maximumFractionDigits) => {
  if (data) {
    return data.toLocaleString(undefined, { maximumFractionDigits });
  } else {
    return "?";
  }
};
