import React from "react";
import { Form, Input } from "semantic-ui-react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

class InvestModal extends React.Component {
  render() {
    console.log(this.props.popen);
    return (
      <Modal
        open={this.props.popen}
        closeIcon
        basic
        size="fullscreen"
        dimmer="inverted"
        onClose={e => this.props.clh()}
        style={{display: "flex",
          flexDirection: "row",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 18px 0 #e5e5e5",
          height:"95%",
          overflowY:"none"}}
      >
        <Header content={(<div style={{fontSize: "4vh"}}>{this.props.popen}</div>)} />
        <Modal.Content>
            <div>
                <div className="Logo" style={{display: "inline-block"}}>LOGO HERE</div>
                <div style={{float:"right", textAlign: "left", display: "inline-block"}}>Reedemable shit goes here</div>
            </div>
          <form>
              <div style={{height: "40px"}} ></div>
            <table border="0" width="100%">
              <tr style={{ fontWeight: "bold", fontSize: "2.5vh"}}>
                <td style={{ paddingLeft: "15px"}}>ETF</td>
                <td style={{ paddingLeft: "15px"}}>Price</td>
                <td style={{ paddingLeft: "15px"}}>Unit</td>
              </tr>
              {[
                "iShares Select Divid",
                "iShares Select Divid",
                "iShares Select Divid",
                "iShares Select Divid"
              ].map(v => {
                return <TableEntry />;
              })}
            </table>
          </form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted>
            <Icon name="checkmark" />INVEST
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
class TableEntry extends React.Component {
  render() {
      let tdstyle = { padding: "15px 5px", fontSize: "2.2vh" }
    return (
      <tr>
        <td style={tdstyle}>iShares Select Divid</td>
        <td style={tdstyle}>HKD100</td>
        <td style={tdstyle}>
          <input
            style={{ borderBottom: "1px solid #000 !important" }}
            type="text"
            name="pin"
            maxlength="6"
            size="6"
          />
        </td>
      </tr>
    );
  }
}
export default InvestModal;
