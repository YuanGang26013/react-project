/**
 * Created by Gene on 16/3/17.
 */
import { push } from 'react-router-redux'

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';
export const MODIFY_USER = 'MODIFY_USER';

export const REQUEST_GET = 'REQUEST_GET';
export const RECEIVE_GET = 'RECEIVE_GET';
export const INITIALIZE_USER_FORM = 'INITIALIZE_USER_FORM';


export const deleteUser = () => {
    return {
        type: DELETE_USER
    }
};

export const modifyUser = (username, age, seq) => {
    return {
        type: MODIFY_USER,
        username,
        age,
        seq
    }
};


const requestGet = () => {
    return {
        type: REQUEST_GET
    }
};

const receiveGet = (users) => {
    return {
        type: RECEIVE_GET,
        users
    }
};

function fetchGet() {
    return dispatch => {
        dispatch(requestGet());

        return fetch('./mock/users.json')
            .then(response => response.json())
            .then(json => dispatch(receiveGet(json)))
    }
}

const addUser = (username, age) => {
    return {
        type: ADD_USER,
        user: {
            userName:username,
            age
        }
    };
};

const initializeUserForm = (user) => {
    return {
        type: INITIALIZE_USER_FORM,
        user
    }
};

export function fetchGetIfNeeded() {
    return (dispatch, getState) => {
        if(!getState().managerReducer.users.length) {
            dispatch(fetchGet());
        }
    }
}

export const addUserAction = (username, age) => {
    return dispatch => {
        dispatch(addUser(username, age));
        dispatch(push('/manager'));
    }
};

export const setUserChecked = (index, checked) => {
    return {
        type: MODIFY_USER,
        index,
        checked
    }
};

export const modifyUserProperty = (index, checked) => {
    return {
        type: MODIFY_USER,
        index,
        checked
    }
};

export const openUserFormAction = (user, seq) => {
    return dispatch => {
        dispatch(push('/modifyUser/'+seq));
        dispatch(initializeUserForm(user));
    }
};

export const modifyUserPropertyAction = (username, age, seq) => {
    return dispatch => {
        dispatch(modifyUser(username,age,seq));
        dispatch(push('/manager'));
    }
};
