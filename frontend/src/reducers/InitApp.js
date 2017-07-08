const InitAppReducer = (state = {}, action) => {
    switch(action.type){
        case "INIT_APP":
            return {
                data: action.payload, 
                ...state
            }
        default:
            return state
    }
}

export default InitAppReducer