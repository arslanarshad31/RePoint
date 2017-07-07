import axios from 'axios';

const SET_USER_ALL = 'SET_USER_ALL';
const SET_PRODUCTS = 'SET_PRODUCTS';

const defaultState = {
    userData: {},
    products: []
}

export function getUserAll() {
    return dispatch => axios.get(`/api/user/all`)
    .then(userData => dispatch({
        type: SET_USER_ALL,
        userData
    }));
}

export function getProducts() {
    return dispatch => axios.get(`/api/products`)
    .then(productsData => dispatch({
        type: SET_PRODUCTS,
        productsData
    }));
}


export default function reducer(state = defaultState, action) {
    switch(action.type){
        case SET_USER_ALL: return {
            ...state,
            products: action.products
        }
        case SET_PRODUCTS: return {
            ...state,
            user: action.userData
        }
    }
}