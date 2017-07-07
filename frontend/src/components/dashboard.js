import React from "react";
import { Image, List } from "semantic-ui-react";

export default class Dashboard extends React.Component {
  render() {
    return (
      <List celled>
        <DashItem />
      </List>
    );
  }
}

class DashItem extends React.Component {
  render() {
    return (
      <List.Item>
        <Image avatar src="https://dummyimage.com/600x400/000/fff" />
        <List.Content>
          <List.Header>Snickerdoodle</List.Header>
          An excellent companion
        </List.Content>
      </List.Item>
    );
  }
}
