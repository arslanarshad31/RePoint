import Axios from 'axios'
import store from '../mainstore'
import _ from 'lodash'

function makeAction(type, status, payload){
    return {
        type: type,
        status: status,
        payload: payload
    };
}

function dispatchAction(action){
    store.dispatch(action);
}

function dispatchAsyncAction(data, req){
    // dispatch action with status loading/pending 
    // make async call 
    //      if success then respond with success and payload 
    //      if error then respond with error and error message (optional)
    let action = _.cloneDeep(data);
    action.status = "l";
    dispatchAction(action);
    console.log("action dispatched");
    Axios({
        method: req.method,
        url: req.url,
        data: req.data,
    }).then(
        (res) => {
            action.status = "success";
            action.payload = res.data;
            console.log("action successful");
            dispatchAction(action);
        }, 
        (error) => {
            action.status = "error";
            action.payload = error;
            console.log("action failed");
            dispatchAction(action);
        }
    );
}

export {makeAction, dispatchAction, dispatchAsyncAction};