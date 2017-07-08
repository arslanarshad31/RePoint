import React, { Component } from "react";
import { Button, Card, Image, Item, Label, Icon } from "semantic-ui-react";

export default class Promotion extends React.Component {
  render() {
    return (
      <Item.Group divided>
        {["SC", "HSBC", "CITI"].map(v => {
          return <PromotionItem />;
        })}
      </Item.Group>
    );
  }
}

class PromotionItem extends React.Component {
  render() {
    return (
      <div
        style={{
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 18px 0 #e5e5e5",
          margin: 'auto',
          marginBottom: "15px",
          width: '95%'
        }}
      >
        <img
          src="https://dummyimage.com/600x300"
          width='100%'
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            marginBottom: "15px"
          }}
        />
        <div style={{ padding: "5px 15px" }}>
          <div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "left",
                color: "#4b4d5a"
              }}
            >
              Heading goes here
            </span>
            <img src="https://dummyimage.com/300x300" width="40" height="40" style={{ float: "right" }}/>
          </div>
          <div
            style={{
              fontSize: "14px",
              lineHeight: "1.1",
              textAlign: "left",
              color: "#a9a9af",
              marginTop: "15px",
              marginBottom: '15px'
            }}
          >
            The city of southern California, san diego is locally known as
            ‘America’s Finest City’. It’s located on San Diego Bay, an inlet of
            the Pacific Ocean near the...
          </div>
        </div>
      </div>
    );
  }
}
