/**
 * Created by Gene on 16/3/17.
 */

import { push } from 'react-router-redux'

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

function requestPosts(username) {
    return {
        type: REQUEST_POSTS,
        userName: username
    }
}

function receivePosts(json) {
    return {
        type: RECEIVE_POSTS,
        rsp: json
    }
}

export const fetchPosts = (username) => {
    return dispatch => {
        dispatch(requestPosts(username));

        return fetch('./mock/logon.json', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "username=" + username
            })
            .then(response => response.json())
            .then(json => {
                dispatch(receivePosts(json));
                if (json.code === 0) {
                    dispatch(push('/manager'));
                }
            });
    }
};
