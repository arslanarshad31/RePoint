import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Message, Label, Accordion, Card } from 'semantic-ui-react';
  
export default class Portfolio extends Component {
  render() {
    const panels = [
      {
        key: "1",
        title: <Label color="blue" content="APPLE" size="large"/>,
        content: (
          <Message
            info
            header="Details about APPLE stock"
            content={(<DetailsPanel />)}
          />
        )
      },
      {
        key: "2",
        title: <Label color="blue" content="APPLE" size="large"/>,
        content: (
          <Message
            info
            header="Details about APPLE stock"
            content="Details"
          />
        )
      },
      {
        key: "3",
        title: <Label color="blue" content="APPLE"  size="large"/>,
        content: (
          <Message
            info
            header="Details about APPLE stock"
            content="Details"
          />
        )
      },
      {
        key: "4",
        title: <Label color="blue" content="APPLE"  size="large"/>,
        content: (
          <Message
            info
            header="Details about APPLE stock"
            content="Details"
          />
        )
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

class DetailsPanel extends Component{
  render(){
    return (
      <div style={{"textAlign":"center"}}>
          <table border="0" style={{"width": "70%", "fontWeight":"bold"}}>
            <tr><td>Current Price:</td><td>HK$563 <span style={{color: "green"}}>(+1.04%)</span></td></tr>
            <tr><td>Your Returns:</td><td>HK$20053 <span style={{color: "red"}}>(-0.94%)</span></td></tr>
          </table>
      </div>
    )
  }
}

