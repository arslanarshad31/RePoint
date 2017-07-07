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
            content="Details"
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
        <Pie
          data={{
            labels: [`No Attempted`, `Correct Answers`, `Incorrect Answers`],
            datasets: [
              {
                data: [35, 22, 20],
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
        <h1>More Data:</h1>
        <Accordion panels={panels} />
      </div>
    );
  }
}
