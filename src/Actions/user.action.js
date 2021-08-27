import { userConstants } from './constants';
import axios from '../Helpers/axios';


export const login = (user) => {

    console.log(user)

    return async (dispatch) => {

        dispatch({ type: userConstants.LOGIN_REQUEST });
        await axios.post(`/signin`, {
            ...user
        }).then(res => {
                const { token, user } = res.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: userConstants.LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                });
            
        }).catch(err => {
            dispatch({
                    type: userConstants.LOGIN_FAILURE,
                    payload: { error: err.response.data.error, message: err.response.data.message  }
                });
        })
        
    }
};

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: userConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } {/*else {
            dispatch({
                type: userConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }*/}
    }
};

export const signup = (user) => {

    console.log(user)

    return async (dispatch) => {

        dispatch({ type: userConstants.SIGNUP_REQUEST });
        await axios.post(`/signup`, {
            ...user
        }).then(res => {
           
                dispatch({
                    type: userConstants.SIGNUP_SUCCESS,
                    payload: { message: res.data.message }
                });
            
        }).catch(err => {
            dispatch({
                type: userConstants.SIGNUP_FAILURE,
                payload: { error: err.response.data.error, message: err.response.data.message }
            });
        });
    }
};

export const getAllUsers = () => {
    return async dispatch => {

        dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
        await axios.get(`/getUsers`).then(res => {
            dispatch({
                type: userConstants.GET_ALL_USERS_SUCCESS,
                payload: { users: res.data.user , message:res.data.message}
            });
        }).catch(err => {
            dispatch({
                type: userConstants.GET_ALL_USERS_FAILURE,
                payload:  { error: err.data},
            });
        })
       
    }
};