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
          height: "539px",
          marginBottom: "15px"
        }}
      >
        <div
          style={{
            height: "330px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            background: "url('https://dummyimage.com/900x900') no-repeat",
            marginBottom: "15px"
          }}
        />
        <div style={{ padding: "5px 15px" }}>
          <div>
            <span
              style={{
                fontSize: "4.37vh",
                fontWeight: "bold",
                letterSpacing: "-1px",
                textAlign: "left",
                color: "#4b4d5a"
              }}
            >
              Heading goes here
            </span>
            <span style={{ float: "right" }}>B</span>
          </div>
          <div
            style={{
              fontFamily: "SFUIText",
              fontSize: "3.5vh",
              lineHeight: "1.1",
              letterSpacing: "-0.9px",
              textAlign: "left",
              color: "#a9a9af",
              marginTop: "15px"
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
