import React from 'react'

import ListItem from '../components/listitem'
import { connect } from 'react-redux';
import JobsAction from '../actions/jobs';


class Jobs extends React.Component{
    componentDidMount(){
        JobsAction.loadList();
    }
    render(){
        //console.log(this.props.data);
        return (
            <div>
                <h1>List</h1>
                {this.props.data.map((val, i) => (<ListItem key={i}>{val.company_name}</ListItem>))}
            </div>
        );
    }
}

function mapStateToProps (store) {
    return {
        data: store.jobs.data
    };
}

export default connect(mapStateToProps)(Jobs);

