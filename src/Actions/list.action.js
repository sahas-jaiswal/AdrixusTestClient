import { listConstants } from './constants';
import axios from '../Helpers/axios';

export const getAllUsers = () => {
    return async dispatch => {

        dispatch({ type: listConstants.GET_ALL_USERS_REQUEST });
        await axios.get(`/getUsers`).then(res => {
            dispatch({
                type: listConstants.GET_ALL_USERS_SUCCESS,
                payload: { users: res.data.user , message:res.data.message}
            });
        }).catch(err => {
            dispatch({
                type: listConstants.GET_ALL_USERS_FAILURE,
                payload:  { error: err.data},
            });
        })
       
    }
};