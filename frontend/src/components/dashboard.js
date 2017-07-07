import React from 'react'
//import { connect } from 'react-redux';
export default class Dashboard extends React.Component{

    render(){
        return (<div><h1>HELLO</h1>
            {(["SC", "HSBC", "CITI"]).map((val) => {
                return (<DashItem content={val}></DashItem>)
            }
            )}</div>
        )

    }

}

class DashItem extends React.Component{
    render(){
        return (<div style={{"border": "2px solid", "width":"auto", "height":"50px"}}>{this.props.content}</div>)
    }
}