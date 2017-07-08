import React, { Component } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter as Router, Route } from "react-router-dom";
import rootReducer from "./reducers";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Promotions from "./components/Promotions";
import Portfolio from "./components/Portfolio";
import Shop from "./components/Shop";
import "semantic-ui-css/semantic.min.css";

let initialState;
if (typeof window !== "undefined") {
  initialState =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

const store = createStore(
  combineReducers({ main: rootReducer }),
  initialState,
  applyMiddleware(thunk)
);
class Top extends React.Component {
  constructor(props){
    super()
    this.state = {active: "DASHBOARD"}
  }
  clickHandler(name){
      this.setState({active: name})
  }
  render() {
    return (
      <div
        style={{
          width: "auto",
          height: "167px",
          backgroundColor: "#ffffff",
          textAlign: "center"
        }}
      >
        <div>
          <img
            style={{
              width: "177px",
              height: "29px",
              objectFit: "contain",
              margin: "29px auto"
            }}
            src="imgs/ic-logo.png"
            class="ic_logo"
          />
        </div>
        <div id="navbar">

                <NavItem cl={(e) => this.clickHandler("DASHBOARD")} active={this.state.active == "DASHBOARD"} name="DASHBOARD" />

                <NavItem cl={(e) => this.clickHandler("PORTFOLIO")} active={this.state.active == "PORTFOLIO"} name="PORTFOLIO" />

                <NavItem cl={(e) => this.clickHandler("SHOP")} active={this.state.active == "SHOP"} name="SHOP" />

                <NavItem cl={(e) => this.clickHandler("PROMOTION")} active={this.state.active == "PROMOTION"} name="PROMOTION" />
        </div>
      </div>
    );
  }
}

class NavItem extends React.Component {
  componentDidUpdate(prevProps, prevState){
  }
  render() {
    let style = {}
    if (this.props.active) {
       style = {
        fontSize: "2.65vh",
        letterSpacing: "-0.8px",
        fontWeight: "600",
        borderBottom: "4px solid #7d819a",
        textAlign: "center",
        color: "#7d819a",
        margin: "0 10px",
        paddingBottom: "16px",
        display:"inline-block"
      };
    } else {
      style = {
        margin: "0 10px",
        fontSize: "2.65vh",
        letterSpacing: "-0.8px",
        textAlign: "center",
        color: "#c8c9cd",
        paddingBottom: "20px",
        display:"inline-block"
      };
    }
    return (
      <div className="nav_item" onClick={this.props.cl}style={style}>
        {this.props.name}
      </div>
    );
  }
}

const App = () =>
  <div>
    <Top />
    <Provider store={store}>
      <Router>
        <div style={{ marginTop: "20px", padding: "0 15px" }}>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/promotions" component={Promotions} />
          <Route exact path="/portfolio" component={Portfolio} />
        </div>
      </Router>
    </Provider>
  </div>;

export default App;
