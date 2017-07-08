import React from 'react'

export default class LoadPage extends React.Component{
    render(){
        return (
            <div>
                <div style={{height: "200px"}} ></div>
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
                <img style={{
                    display: "block",
                    margin: "20px auto"
                }}src="https://d13yacurqjgara.cloudfront.net/users/12755/screenshots/1037374/hex-loader2.gif" />
            </div>
        )
    }
}