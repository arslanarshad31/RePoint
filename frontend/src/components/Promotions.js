import React, { Component } from "react";
import { Button, Card, Image, Item, Label, Icon } from "semantic-ui-react";

export default class Promotions extends React.Component {
  render() {
    console.log(this.props.promos)
    let contents = this.props.promos.map(v => {
      let newimage = v.imageURL
      newimage = newimage.replace("assets/", "")
      newimage = newimage.replace("_", "-")
      return {
        ...v,
        imageURL: newimage,
        bankImageURL: this.props.banks.find((e) => {

          if (e["bankId"] == v["bankId"]) {
            return true
          }else{
            return false
          }
        }).logoURL
      }
    }) 
    console.log(contents)
    return (
      <Item.Group divided>
        {contents.map(v => {
          return <PromotionItem vals={v}/>;
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
          src={this.props.vals.imageURL}
          width='100%'
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            marginBottom: "15px"
          }}
        />
        <div style={{ padding: "5px 15px" }}>
          <div >
            <img src={this.props.vals.bankImageURL} width="40" height="40" style={{ float: "right" }}/>
            <span
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "left",
                color: "#4b4d5a"
              }}
            >
              {this.props.vals.name}
            </span>
            
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
            {this.props.vals.description}
          </div>
        </div>
      </div>
    );
  }
}
