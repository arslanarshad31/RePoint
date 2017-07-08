const PortfolioReducer = (state = {}, action) => {
    switch(action.type){
        case "GET_PORTFOLIO":
            console.log("In PortfolioReducer")
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

export default PortfolioReducer;