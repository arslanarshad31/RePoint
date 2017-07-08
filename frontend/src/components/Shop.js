import React from "react";
import { Button, Card, Image, Item, Label, Icon } from "semantic-ui-react";

export default class Shop extends React.Component {
  render() {
    return (
      <Item.Group divided style={{ marginTop: "500px" }}>
        {["SC", "HSBC", "CITI"].map(v => {
          return <ShopItem />;
        })}
      </Item.Group>
    );
  }
}

class ShopItem extends React.Component {
  render() {
    console.log("runs");
    return (
      <div
        style={{
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 18px 0 #e5e5e5",
          width: "45%",
          position: 'relative',
          marginBottom: "10px",
          paddingBottom: '10px',
          display: 'inline-block',
          marginRight: '10px'
        }}
      >
        <img
          src="https://dummyimage.com/400x400"
          style={{
            width: "100%",
            borderRadius: "10px"
          }}
        />
        <div
          style={{
            fontSize: "16px",
            textAlign: "left",
            color: "#4b4d5a",
            marginLeft: "10px",
            marginBottom: "10px"
          }}
        >
          MacBook Pro
        </div>
        <div
          style={{
            fontSize: "12px",
            textAlign: "left",
            color: "#a9a9af",
            marginLeft: "10px"
          }}
        >
          19000 points
        </div>
        <div
          style={{
            fontSize: "14px",
            textAlign: "left",
            color: "#005cff",
            marginLeft: "10px"
          }}
        >
          10000 points
        </div>
        <img
          src="https://dummyimage.com/400x400"
          width ='35px'
          height = '35px'
          style={{
            position: "absolute",
            bottom: '12px',
            right: '10px'
          }}
        />
      </div>
    );
  }
}
