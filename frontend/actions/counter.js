import store from '../mainstore'
import {makeAction, dispatchAction, dispatchAsyncAction} from './actionmaker'

const CounterAction = {
    increment: function(){
        dispatchAction(makeAction("INC", "l", null));
    }
}

export default CounterAction;