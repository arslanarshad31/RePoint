import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

export default class Dashboard extends React.Component {
  render() {
    return (
      <Card.Group style={{ paddingTop: "20px" }}>
        {[
          { name: "SC", pts: 1000 },
          { name: "HSBC", pts: 1000 },
          { name: "CITI", pts: 500 }
        ].map(val => {
          return <DashItem name={val.name} pts={val.pts} />;
        })}
      </Card.Group>
    );
  }
}

class DashItem extends React.Component {
  render() {
    return (
      <Card style={{ margin: "10px auto", width: "90%" }}>
        <Card.Content>
          <Image
            floated="right"
            src="https://dummyimage.com/200x200"
          />
          <Card.Header>
            {this.props.name}
          </Card.Header>
          <Card.Meta><strong>Account:</strong> 85297023133</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button primary size="medium" style={{ position: 'absolute', right: '10px' }}>
            Invest
          </Button>
          <h1 style={{ margin: "0px" }}>1000 Points</h1>
          <div>
            <h3 style={{ margin: "0px" }} >1 point = HK$10</h3>
            <h3 style={{ margin: "0px" }} >Reedamble Money: 1000HKD</h3>
          </div>
        </Card.Content>
      </Card>
    );
  }
}
