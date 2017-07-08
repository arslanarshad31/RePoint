import React, { Component } from "react";
import Dashboard from './Dashboard';
import Portfolio from './Portfolio';
import Shop from './Shop';
import Promotion from './Promotions'

export default class Top extends React.Component {
  constructor(props) {
    super();
    this.state = { active: "DASHBOARD" };
  }
  clickHandler(name) {
    this.setState({ active: name });
  }
  render() {
    console.log(this.state.active)

    let content = null;
    switch(this.state.active) {
      case 'DASHBOARD':
        content = <Dashboard/>
      case 'PORTFOLIO':
        content = <Portfolio/>
      case 'SHOP':
        content = <Shop/>
      case 'PROMOTION':
        content = <Promotion/>
      default:
        content = <Shop/>
    }

    return (
      <div
        style={{
          width: "auto",
          height: "167px",
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <img
            style={{
              width: "40%",
              margin: "auto",
              marginTop: "20px",
              marginRight: "10px"
            }}
            src="imgs/ic-logo@2x.png"
          />
        </div>
        <div style={{
          display: 'flex',
          flexBasis: '100%',
          marginTop: '20px',
          width: '100%',
          marginBottom: '10px'
        }}>
          <NavItem
            cl={e => this.clickHandler("DASHBOARD")}
            active={this.state.active == "DASHBOARD"}
            name="DASHBOARD"
          />

          <NavItem
            cl={e => this.clickHandler("PORTFOLIO")}
            active={this.state.active == "PORTFOLIO"}
            name="PORTFOLIO"
          />

          <NavItem
            cl={e => this.clickHandler("SHOP")}
            active={this.state.active == "SHOP"}
            name="SHOP"
          />

          <NavItem
            cl={e => this.clickHandler("PROMOTION")}
            active={this.state.active == "PROMOTION"}
            name="PROMOTION"
          />
        </div>
        { content } 
      </div>
    );
  }
}

class NavItem extends React.Component {
  componentDidUpdate(prevProps, prevState) {}
  render() {
    let style = {};
    if (this.props.active) {
      style = {
        fontSize: "14px",
        borderBottom: "2px solid #7d819a",
        textAlign: "center",
        color: "#7d819a",
        margin: "0 5px",
        paddingBottom: "6px",
      };
    } else {
      style = {
        margin: "0 5px",
        fontSize: "14px",
        textAlign: "center",
        color: "#c8c9cd",
        paddingBottom: "6px",
      };
    }
    return (
      <div className="nav_item" onClick={this.props.cl} style={style}>
        {this.props.name}
      </div>
    );
  }
}
