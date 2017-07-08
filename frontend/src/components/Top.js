import React from "react";
import { Segment, Header } from "semantic-ui-react";

export default class Top extends React.Component {
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
            <table border="0">
            <tr>
                <td>
          <NavItem name="DASHBOARD" />
          </td>
          <td>
          <NavItem name="PORTFOLIO" />
        </td>
        <td>
          <NavItem name="SHOP" />
          </td>
          <td>
          <NavItem name="PROMOTION" />
          </td>
          </tr>
          </table>
        </div>
      </div>
    );
  }
}

class NavItem extends React.Component{
    render(){
        return (<div
            className="nav_item"
            style={{
              margin: "0 10px",
              fontSize: "2.65vh",
              letterSpacing: "-0.8px",
              textAlign: "center",
              color: "#c8c9cd"
            }}
          >
            {this.props.name}
          </div>)
    }
}
