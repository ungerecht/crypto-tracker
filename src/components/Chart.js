import React from "react";
import ReactHighcharts from "react-highcharts/ReactHighstock.src";
import moment from "moment";
import { Card } from "react-bootstrap";
import { formatCurrency } from "@coingecko/cryptoformat";

const Chart = ({ coin }) => {
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
        data: coin.chart.prices,
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

export default Chart;
