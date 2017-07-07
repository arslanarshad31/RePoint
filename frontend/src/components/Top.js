import React from "react";
import { Segment, Header } from "semantic-ui-react";

export default class Top extends React.Component {
  render() {
    return (
      <Segment>
        <Header as="h1" textAlign="center">
          RePoints
        </Header>
      </Segment>
    );
  }
}
