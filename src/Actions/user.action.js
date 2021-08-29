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
export const signout = () => {
    return async dispatch => {

        dispatch({ type: userConstants.LOGOUT_REQUEST });
        const res = await axios.post(`/signout`);

        if (res.status === 200) {
            localStorage.clear();
            dispatch({ type: userConstants.LOGOUT_SUCCESS });
        } else {
            dispatch({
                type: userConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }
    }
};

