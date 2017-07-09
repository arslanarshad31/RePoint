import React, { Component } from "react";
import { connect } from "react-redux";
import { Pie } from "react-chartjs-2";
import { Message, Label, Accordion, Card } from "semantic-ui-react";
import getPortfolioData from "../actions/portfolio";
import LoadPage from "./LoadPage"
class Portfolio extends Component {
  componentDidMount() {
    console.log("Getting portfolio Data..");
    this.props.getPortfolio();
  }
  render() {
    console.log(this.props.portData);
    const panels = this.props.stocks.map(s => ({
      key: s.stockId,
      title: <CustomLabel content={s.name} />,
      content: <DetailsPanel portData={this.props.portData} content={s.name} />
    }));

     if (this.props.portData == null) {
      return <h3 style={{textAlign: "center"}}>Loading Data</h3>;
    } else return (
      <div>
        <div style={{
          marginTop: '20px',
          marginBottom: '20px'
        }}>
          <Pie
            data={{
              labels: [`Fixed Income`, `Equity`],
              datasets: [
                {
                  data: [35, 42],
                  backgroundColor: ["#46BFBD", "#005cff"],
                  hoverBackgroundColor: ["#5AD3D1", "#005cff"]
                }
              ]
            }}
            options={{
              cutoutPercentage: '40',
              legend: {
                position: "bottom"
              },
              animation: {
                animateScale: true
              }
            }}
          />
            <div
              style={{
                textAlign: "center",
                color: "#7d819a",
                fontSize: "18px",
                marginTop: "20px"
              }}
            >
              NAV as of Today: <b>HK${this.props.portData.NAVHKD}</b>
            </div>
            <div
              style={{
                textAlign: "center",
                color: "#7d819a",
                fontSize: "18px",
                marginTop: "10px"
              }}
            >
              NAV Return: <b>{this.props.portData.NAVReturnPercent}%</b>
            </div>
            </div>
          <Accordion panels={panels} />
        </div>
      ); 
    }
  }

class DetailsPanel extends Component {

  render() {
    return (
      <div
        style={{
          backgroundColor: "#f8f8f8",
          border: "solid 1px #e3e3e3",
          padding: "20px 20px",
          color: "#7d819a"
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          - Current Price:{" "}
          <b>
            HK${this.props.portData.currentPrice}
            <span style={{ color: "green", paddingLeft: "10px" }}>+{this.props.portData.dailyGainPercent}%</span>
          </b>
        </div>

        <div>
          - Your Returns:{" "}
          <b>
            HK${this.props.portData.return}
            <span style={{ color: "green", paddingLeft: "10px" }}>+{this.props.portData.returnPercent}%</span>
          </b>
        </div>
      </div>
    );
  }
}

class CustomLabel extends React.Component {
  render() {
    return (
      <div
        style={{
          border: "solid 1px #e3e3e3",
          fontSize: "2.1vh",
          padding: "20px 5px",
          backgroundColor: 'white'
        }}
      >
        {this.props.content}
        <div style={{ float: "right" }}>
          <img
            src="imgs/arrow_up.png"
            alt=""
            style={{ height: "3vh", marginRight: "10px" }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    portData: state.PortfolioReducer.data || null
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPortfolio(data) {
      dispatch(getPortfolioData(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
