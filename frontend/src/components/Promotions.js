import React, {Component} from "react";
import { Button, Card, Image, Item, Label, Icon } from "semantic-ui-react";

export default class Promotions extends React.Component {
  render() {
    return (
      <Item.Group divided>
        {["SC", "HSBC", "CITI"].map(v => {
          return <PromotionItem/>;
        })}
      </Item.Group>
    );
  }
}

class PromotionItem extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row", marginBottom: '10px' }}>
        <Image
          src="https://dummyimage.com/100x100"
          style={{ marginRight: "20px"}}
        />
        <Item fluid>
          <Item.Content>
            <Button
              primary
              style={{ position: "absolute", right: "10px", marginTop: "5px" }}
            >
              Purchase
              <Icon name="right chevron" />
            </Button>
            <Item.Header as="a">12 Years a Slave</Item.Header>
            <Item.Meta>
              <span className="cinema">Union Square 14</span>
            </Item.Meta>
            <Item.Description>Hi this just some random text</Item.Description>
            <Item.Extra>
              <Label>IMAX</Label>
              <Label icon="globe" content="Additional Languages" />
            </Item.Extra>
          </Item.Content>
        </Item>
      </div>
    );
  }
}
