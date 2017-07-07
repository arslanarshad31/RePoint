import React from 'react'
import Number from '../components/number'
import Button from '../components/button'
import { connect } from 'react-redux';
import CounterAction from '../actions/counter'

class Counter extends React.Component{
    handleButtonClick(e){
        //this.counterStore.increment();
        CounterAction.increment();
    }
    render(){
        console.log("rerendered");
        return (<div><Number num={this.props.count} /><Button onClick={this.props.handleButtonClick} /></div>);
    }
}
function mapStateToProps(state){
    return {
        count: state.counter.num
    };
}
function mapDispatchToProps(dispatch){
    return {
        handleButtonClick: function (e){
            //this.counterStore.increment();
            CounterAction.increment();
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Counter)

