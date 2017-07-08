const reducer = (state = {}, action) => {
    switch(action.type){
        case "GET_ALL":
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

export default reducer;