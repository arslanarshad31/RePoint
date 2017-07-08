import { combineReducers } from 'redux';
import InitAppReducer from './InitApp'
import PortfolioReducer from './PortfolioReducer'
const rootReducer = combineReducers({
    InitAppReducer,
    PortfolioReducer
});

export default rootReducer;