import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        {[
          { name: "SC", pts: 1000 },
          { name: "HSBC", pts: 1000 },
          { name: "CITI", pts: 500 }
        ].map(val => {
          return <DashItem name={val.name} pts={val.pts} />;
        })}
      </div>
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
            marginBottom: "10px",
            width: '100%',
            marginRight: '15px'
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
              marginTop: "5px",
              color: "#7d819a"
            }}
          >
            <div>Account number:</div>
            <div>Account number:</div>
            <div>Account number:</div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "left",
                color: "#005cff",
                float: 'right',
                marginTop: '10px'
              }}
            >
              Invest Now >
            </div>
          </div>
        </div>
      </div>
    );
  }
}
