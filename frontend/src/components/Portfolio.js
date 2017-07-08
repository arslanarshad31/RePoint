import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Message, Label, Accordion, Card } from "semantic-ui-react";

export default class Portfolio extends Component {
  render() {
    const panels = [
      {
        key: "1",
        title: <CustomLabel content="iShares Select Dividend ETF" />,
        content: <DetailsPanel content="iShares Select Dividend ETF" />
      },
      {
        key: "2",
        title: <CustomLabel content="iShares Select Dividend ETF" />,
        content: <DetailsPanel content="iShares Select Dividend ETF" />
      },
      {
        key: "3",
        title: <CustomLabel content="iShares Select Dividend ETF" />,
        content: <DetailsPanel content="iShares Select Dividend ETF" />
      },
      {
        key: "4",
        title: <CustomLabel content="iShares Select Dividend ETF" />,
        content: <DetailsPanel content="iShares Select Dividend ETF" />
      }
    ];

    return (
      <div>
        <div>
          <Pie
            data={{
              labels: [`Fixed Income`, `Equity`],
              datasets: [
                {
                  data: [35, 42],
                  backgroundColor: ["#46BFBD", "#93C953", "#F7464A"],
                  hoverBackgroundColor: ["#5AD3D1", "#93C946", "#FF5A5E"]
                }
              ]
            }}
            options={{
              legend: {
                position: "bottom"
              },
              animation: {
                animateScale: true
              }
            }}
          />
        </div>
        <h1>More Data:</h1>

          <Accordion panels={panels} />
      </div>
    );
  }
}

class DetailsPanel extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#f8f8f8",
          border: "solid 1px #e3e3e3",
          padding: "0 20px"
        }}
      >
        <ul>
          <li>
            Current Price:HK$563{" "}
            <span style={{ color: "green" }}>(+1.04%)</span>
          </li>

          <li>
            Your Returns:HK$20053 <span style={{ color: "red" }}>(-0.94%)</span>
          </li>
        </ul>
      </div>
    );
  }
}

class CustomLabel extends React.Component {
  render() {
    return (
      <div
        style={{
          border: "solid 1px #e3e3e3",
          fontSize: "2.5vh",
          fontWeight: "bold",
          padding: "10px 5px"
        }}
      >
        {this.props.content}
        <div style={ {float: "right"} }>
        <img src="imgs/st-up.png" alt="" style={{height: "3vh"}}/></div>
      </div>
    );
  }
}
