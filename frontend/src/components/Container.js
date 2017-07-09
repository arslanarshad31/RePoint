import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "./Dashboard";
import Portfolio from "./Portfolio";
import Shop from "./Shop";
import LoadPage from "./LoadPage";
import Promotions from "./Promotions";
import InitApp from "../actions/index"

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
    if (this.props.initialData === null) {
      return <LoadPage />;
    } else {
      const { initialData: {Account, Bank, Product, Stock, Promotion} } = this.props;
      let content = null;
      switch (this.state.active) {
        case "DASHBOARD":
          content = <Dashboard accounts={Account} banks={Bank} stocks={Stock} goToPortfolio={() => this.clickHandler('PORTFOLIO')}/>
          break;
        case "PORTFOLIO":
          content = <Portfolio stocks={Stock}/>;
          break;
        case "SHOP":
          content = <Shop products={Product} banks={Bank}/>;
          break;
        case "PROMOTION":
          content = <Promotions promos={Promotion} banks={Bank}/>;
          break;
        default:
          break;
      }
  
    return (
      <div
        style={{
          backgroundColor: "#fafafa",
          paddingRight: '5px',
          paddingLeft: '5px'
        }}
      >
          <div
            style={{
              width: "100%",
              position: "fixed",
              top: "0",
              left: "0",
              zIndex: "999",
              padding: "0 15px",
              backgroundColor: "#ffffff"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                style={{
                  width: "40%",
                  margin: "auto",
                  marginTop: "30px",
                  marginRight: "10px"
                }}
                src="imgs/ic-logo@2x.png"
              />
            </div>
            <div
              style={{
                display: "flex",
                flexBasis: "100%",
                justifyContent: "space-between",
                marginTop: "25px",
                width: "100%",
                marginBottom: "15px",
                textAlign: "center"
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
          <div style={{height: "18vh"}}></div>
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
        fontSize: "2.3vh",
        borderBottom: "2px solid #7d819a",
        textAlign: "center",
        color: "#7d819a",
        margin: "0 5px",
        paddingBottom: "4px"
      };
    } else {
      style = {
        margin: "0 5px",
        fontSize: "2.3vh",
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
  return {
    initialData: state.InitAppReducer.data || null
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
