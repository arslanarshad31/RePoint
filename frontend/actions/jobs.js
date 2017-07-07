import store from '../mainstore'
import {makeAction, dispatchAction, dispatchAsyncAction} from './actionmaker'

const JobsAction = {
    loadList: function(){
        dispatchAsyncAction(makeAction("LOAD_LIST", "l", null), {
            url: "http://codepen.io/jobs.json",
            method: "GET",
            data: null
        });

    }
}

export default JobsAction;
