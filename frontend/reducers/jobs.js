import React from 'react'
import _ from 'lodash'
function JobsReducer(state = {}, action){
    if(_.isEmpty(state)){
        state.data = [];
        return state;
    }
    switch(action.type){
        case "LOAD_LIST":
            if(action.status == "success"){
                return {
                    data : action.payload.jobs  
                };
            }else{
                return {
                    data: [
                            "loading list"
                        ]
                    
                };
            }
            break;
        default:
            return state;
    }

}

export default JobsReducer;