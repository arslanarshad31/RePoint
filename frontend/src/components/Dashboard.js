import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

export default class Dashboard extends React.Component {
  render() {
    return (
      <Card.Group>
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
      <div
        style={{
          margin: "10px auto",
          width: "95%",
          display: "flex",
          flexDirection: "row",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 18px 0 #e5e5e5"
        }}
      >
        <img
          src="https://dummyimage.com/400x400/000/fff"
          width="70px"
          height="70px"
          style={{
            marginLeft: "20px",
            marginTop: "20px"
          }}
        />
        <div
          style={{
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "10px"
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              letterSpacing: "-0.2px",
              textAlign: "left",
              color: "#4b4d5a"
            }}
          >
            Societe General
          </span>
          <div
            style={{
              marginTop: "10px"
            }}
          >
            Account number:
          </div>
          <div>Account number:</div>
          <div>Account number:</div>
        </div>
      </div>
    );
  }
}
