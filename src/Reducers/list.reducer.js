import { listConstants } from "../Actions/constants";

const initState = {
    token: null,
    users:[],
    authenticate: false,
    authenticating: false,
    loading: false,
    error: '',
    message: '',
};

export default (state = initState, action) => {

    console.log(action);

    switch (action.type) {
        
        case listConstants.GET_ALL_USERS_REQUEST:
            state = {
                ...state,
                loading:true,
            }
            break;
        case listConstants.GET_ALL_USERS_SUCCESS:
            state = {
                ...state,
                users: action.payload.users,
                loading:false,
            }
            break;
        case listConstants.GET_ALL_USERS_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading:false,
            }
            break;

    }

    return state;
}