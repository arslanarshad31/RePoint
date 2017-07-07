import React from 'react'
import _ from 'lodash'
function CounterReducer(state = {}, action){
    if(_.isEmpty(state)){
        state.num = 0;
        return state;
    }
    switch(action.type){
        case "INC":
            return {num: state.num+1};
            break;
        default:
            return state;
    }

}

export default CounterReducer;