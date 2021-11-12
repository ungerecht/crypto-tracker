import React, { useEffect, useState } from "react";
import moment from "moment";
import { concat } from "lodash";
import coingecko from "../apis/coingecko";
import ReactHighcharts from "react-highcharts/ReactHighstock.src";
import { Card } from "react-bootstrap";
import { formatCurrency } from "@coingecko/cryptoformat";

const CoinChart = ({ coin }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const fetchCoinChart = async () => {
      //to get hourly data from coingecko you have to request data in the range of 90 days
      const today = moment().unix();
      const three_m_ago = moment().subtract(90, "days").unix();
      const six_m_ago = moment().subtract(180, "days").unix();

      const getNowChart = () => {
        //get chart data for last 3 months to today
        return coingecko.get(`${coin.id}/market_chart/range`, {
          params: {
            vs_currency: "usd",
            from: three_m_ago,
            to: today,
          },
        });
      };

      const getPastChart = () => {
        //get chart data for 6 months ago to 3 months ago
        return coingecko.get(`${coin.id}/market_chart/range`, {
          params: {
            vs_currency: "usd",
            from: six_m_ago,
            to: three_m_ago - 1,
          },
        });
      };

      //run both chart calls in parallel
      let [chart_now, chart_past] = await Promise.all([
        getNowChart(),
        getPastChart(),
      ]);

      //combine chart data prices
      const chart = concat(chart_past.data.prices, chart_now.data.prices);
      setChart(chart);
    };
    fetchCoinChart();
  }, [coin]);

  const config = {
    yAxis: [
      {
        offset: 20,
        labels: {
          formatter: function () {
            return formatCurrency(this.value, "USD", "en", false, true);
          },
          x: -15,
          style: { color: "#000" },
          align: "left",
        },
      },
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        return (
          formatCurrency(this.y, "USD", "en") +
          "<br/>" +
          moment(this.x).format("MMMM Do YYYY, h:mm A")
        );
      },
    },
    plotOptions: {
      series: {
        showInNavigator: true,
      },
    },
    chart: {
      height: 600,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      type: "date",
    },
    rangeSelector: {
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1d",
        },
        {
          type: "day",
          count: 7,
          text: "7d",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "all",
          text: "6m",
        },
      ],
      selected: 4,
      inputPosition: { align: "right" },
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 320,
          },
          chartOptions: {
            yAxis: {
              labels: {
                x: -65,
              },
            },
          },
        },
      ],
    },
    series: [
      {
        name: "Price",
        type: "spline",
        data: chart,
      },
    ],
  };

  return (
    <Card className="mt-3 px-2 pt-3">
      <Card.Title className="fw-bold text-center">
        {coin.name} Price Chart
      </Card.Title>
      <ReactHighcharts config={config}></ReactHighcharts>
    </Card>
  );
};

export default CoinChart;
