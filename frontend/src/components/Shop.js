import React from "react";
import { Button, Card, Image, Item, Label, Icon } from "semantic-ui-react";

export default class Shop extends React.Component {
  render() {
    return (
      <Item.Group divided>
        {["SC", "HSBC", "CITI"].map(v => {
          return <ShopItem />;
        })}
      </Item.Group>
    );
  }
}

class ShopItem extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Image
          src="https://dummyimage.com/100x100"
          style={{ marginRight: "20px", paddingBottom: "20px" }}
        />
        <Item fluid>
          <Item.Content>
            <Button
              primary
              style={{ position: "absolute", right: "10px", marginTop: "5px" }}
            >
              Buy tickets
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
