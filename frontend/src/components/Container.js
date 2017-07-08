import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import Portfolio from "./Portfolio";
import Shop from "./Shop";
import Promotion from "./Promotion";
import InitApp from "../actions"

class Container extends React.Component {
  constructor(props) {
    super();
    this.state = { active: "DASHBOARD" };
  }
  clickHandler(name) {
    this.setState({ active: name });
  }
  componentDidMount() {
    console.log('Getting Data..')
    this.props.getAllData({id: "1"})
  }
  render() {
    console.log(this.props);

    if (this.props.initialData === null) {
      return <h3>LOADING</h3>;
    } else {
      const { initialData: {Account, Bank, Product} } = this.props;
      let content = null;
      switch (this.state.active) {
        case "DASHBOARD":
          content = <Dashboard accounts={Account} banks={Bank}/>
          break;
        case "PORTFOLIO":
          content = <Portfolio />;
          break;
        case "SHOP":
          content = <Shop products={Product} banks={Bank}/>;
          break;
        case "PROMOTION":
          content = <Promotion />;
          break;
        default:
          break;
      }
  
    return (
      <div
        style={{
          backGroundcolor: "#fafafa",
          paddingRight: '5px',
          paddingLeft: '5px'
        }}
      >
          <div
            style={{
              backgroundColor: "#ffffff"
            }}
          >
            <div style={{ textAlign: "center" }}>
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
            <div
              style={{
                display: "flex",
                flexBasis: "100%",
                marginTop: "20px",
                width: "100%",
                marginBottom: "10px"
              }}
            >
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
          </div>
          {content}
        </div>
      );
    }
  }
}


class NavItem extends React.Component {
  render() {
    let style = {};
    if (this.props.active) {
      style = {
        fontSize: "14px",
        borderBottom: "2px solid #7d819a",
        textAlign: "center",
        color: "#7d819a",
        margin: "0 5px",
        paddingBottom: "6px"
      };
    } else {
      style = {
        margin: "0 5px",
        fontSize: "14px",
        textAlign: "center",
        color: "#c8c9cd",
        paddingBottom: "6px"
      };
    }

    return (
      <div className="nav_item" onClick={this.props.cl} style={style}>
        {this.props.name}
      </div>
    );
  }
}
function mapDispatchToProps(dispatch){
  return {
    getAllData(data){
      dispatch(InitApp(data))
    }
  }
}
function mapStateToProps(state) {
  console.log(state)
  return {
    initialData: state.InitAppReducer.data || null
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
