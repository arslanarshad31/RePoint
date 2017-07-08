import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Message, Label, Accordion, Card } from "semantic-ui-react";

export default class Portfolio extends Component {
  render() {
    const panels = this.props.stocks.map(s => ({
      key: s.stockId,
      title: <CustomLabel content={s.name} />,
      content: <DetailsPanel content={s.name} />
    }));

    return (
      <div>
        <div style={{
          marginTop: '20px',
          marginBottom: '20px'
        }}>
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
        <div style={{
          textAlign: "center",
          color: "#7d819a",
          fontSize: '18px',
          marginTop: '20px',
        }}>NAV as of Today: <b>HKD 1,000</b></div>
        <div style={{
          textAlign: "center",
          color: "#7d819a",
          fontSize: '18px',
          marginTop: '10px',
        }}>NAV Return: <b>60%</b></div>
        </div>
        <Accordion panels={panels}/>
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
          padding: "20px 20px",
          color: "#7d819a"
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          - Current Price:{" "}
          <b>
            HK$563
            <span style={{ color: "green", paddingLeft: "10px" }}>+1.04%</span>
          </b>
        </div>

        <div>
          - Your Returns:{" "}
          <b>
            HK$20053
            <span style={{ color: "red", paddingLeft: "10px" }}>-0.94%</span>
          </b>
        </div>
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
          fontSize: "2.1vh",
          padding: "20px 5px"
        }}
      >
        {this.props.content}
        <div style={{ float: "right" }}>
          <img
            src="imgs/arrow_up.png"
            alt=""
            style={{ height: "3vh", marginRight: "10px" }}
          />
        </div>
      </div>
    );
  }
}
