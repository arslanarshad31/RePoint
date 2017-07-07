import CounterReducer from './counter'
import JobsReducer from './jobs'

import { combineReducers } from 'redux'

const reducers = combineReducers({
    counter: CounterReducer,
    jobs: JobsReducer
});

export default reducers;