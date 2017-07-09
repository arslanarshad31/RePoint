import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

export default class Dashboard extends React.Component {
  render() {
    const { accounts, banks, stocks } = this.props;
    return (
      <div>
        {accounts.map(acc => {
          let bank = banks.filter(
            b => Number(b.bankId) === acc.bankId
          )[0];
          return <DashItem bank={bank} account={acc} stocks={stocks} goToPortfolio={this.props.goToPortfolio.bind(this)} />;
        })}
      </div>
    );
  }
}


class DashItem extends React.Component {

constructor(props) {
    super();
    this.state = { sumPoints: null, sumAmount: null };
  }

  updateTotal(price, e) {
    this.setState({
      sumAmount: Number(price)*Number(e.target.value),
      sumPoints: Number(e.target.value)
    })
  }

  render() {
    const { bank, account, stocks } = this.props;
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
          src={bank.logoURL}
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
            width: "100%",
            marginRight: "15px"
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
            {bank.name}
          </span>
          <div
            style={{
              marginTop: "5px",
              color: "#7d819a"
            }}
          >
            <div>
              A/C No: {account.accountNumber}
            </div>
            <div>
              Points: {account.points.toLocaleString()}
            </div>
            <div>
              <b>Redeemable Value: {" "}
              {Math.floor(account.redeemableValueHKD).toLocaleString() + " HKD"}</b>
            </div>
            <Modal
              trigger={
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    textAlign: "left",
                    color: "#005cff",
                    float: "right",
                    marginTop: "10px"
                  }}
                >
                  Invest Now >
                </div>
              }
              closeIcon
              basic
              size="fullscreen"
              dimmer="inverted"
              style={{
                display: "flex",
                flexDirection: "row",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 18px 0 #e5e5e5",
                height: "95%",
                overflowY: "none"
              }}
            >
              <div>
                <div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "300",
                      textAlign: "left",
                      color: "#4b4d5a",
                      marginBottom: "15px",
                      marginTop: "10px",
                      marginLeft: '20px'
                    }}
                  >
                    {bank.name}
                  </div>
                  <img
                    src={bank.logoURL}
                    width="80"
                    height="80"
                    style={{ display: "inline-block" }}
                  />
                  <div
                    style={{
                      textAlign: "left",
                      display: "inline-block",
                      paddingBottom: "10px",
                      marginLeft: "15px",
                      color: "#7d819a"
                    }}
                  >
                    <div style={{ fontSize: "14px" }}>
                      <b>
                        Redeemable Value: HKD{" "}
                        {Math.floor(account.redeemableValueHKD).toLocaleString()}
                      </b>
                    </div>
                    <div style={{ marginTop: "7px", fontSize: "14px" }}>
                      Risk Tolerance
                    </div>
                    <img
                      src="imgs/risk_bar.png"
                      height="15"
                      style={{ marginTop: "5px" }}
                    />
                  </div>
                </div>
                <form>
                  <div style={{ height: "40px"}} />
                  <table border="0" width="100%" style={{ marginLeft: '20px', marginRight: '10px' }}>
                    <tr style={{ fontWeight: "bold", fontSize: "2.5vh" }}>
                      <td style={{ paddingLeft: "15px" }}>ETF</td>
                      <td style={{ paddingLeft: "15px" }}>Price</td>
                      <td style={{ paddingLeft: "15px" }}>Unit</td>
                    </tr>
                    {stocks.map(v => {
                      return <TableEntry etf={v.name} price={Math.floor(v.price)} updateTotal={this.updateTotal.bind(this)} />;
                    })}

                    <tr>
                      <td
                        style={{
                          textAlign: "left",
                          color: "#4b4d5a",
                          padding: "25px 0px",

                        }}
                      >
                        <b>Total</b>
                      </td>
                      <td>
                        <input
                          style={{
                            border: "0",
                            outline: "0",
                            background: "transparent",
                            borderBottom: "2px solid #e3e3e3",
                          }}
                          type="text"
                          name="pin"
                          maxlength="7"
                          size="7"
                          value={this.state.sumAmount}
                        />
                      </td>
                      <td>
                        <input
                          style={{
                            border: "0",
                            outline: "0",
                            background: "transparent",
                            borderBottom: "2px solid #e3e3e3",
                            paddingLeft: '20px'
                          }}
                          type="text"
                          name="pin"
                          maxlength="4"
                          size="4"
                          value={this.state.sumPoints}
                        />
                      </td>
                    </tr>
                  </table>
                </form>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-35px",
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: !!this.state.sumAmount ? '#d0d6e0': "#f6f6f6",
                  fontWeight: "bold",
                  color: !!this.state.sumAmount ? '#ffffff': "#a3a9b1",
                  paddingTop: "20px",
                  paddingBottom:'30px'
                }}
                disabled={!this.state.sumAmount}
                onClick={() => this.props.goToPortfolio()}
              >
                INVEST NOW
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

class TableEntry extends React.Component {
  render() {
    return (
      <tr>
        <td
          style={{ textAlign: "left", color: "#4b4d5a", padding: "15px 0px" }}
        >
          {this.props.etf}
        </td>
        <td style={{ textAlign: "left", color: "#005cff" }}>
          HKD {this.props.price.toLocaleString()}
        </td>
        <td>
          <input
            style={{
              border: "0",
              outline: "0",
              background: "transparent",
              borderBottom: "2px solid #e3e3e3",
              marginLeft: "20px"
            }}
            type="text"
            name="pin"
            maxlength="2"
            size="2"
            placeholder="  0"
            onChange={(e) => this.props.updateTotal(Number(this.props.price), e)}
          />
        </td>
      </tr>
    );
  }
}
