import { userConstants } from "../Actions/constants";

const initState = {
    token: null,
    users:[],
    user: {
        username:'',
        firstName: '',
        lastName: '',
        email: '',
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: '',
    message: '',
};

export default (state = initState, action) => {

    console.log(action);

    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
                loading: true
            }
            break;
        case userConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
                loading: false
            }
            break;
        case userConstants.LOGIN_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                message: action.payload.message
            }
            break;
        case userConstants.SIGNUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.SIGNUP_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case userConstants.SIGNUP_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
                message: action.payload.message
            }
            break;
            case userConstants.LOGOUT_REQUEST:
                state = {
                    ...state,
                    loading: true
                }
                break;
            case userConstants.LOGOUT_SUCCESS:
                state = {
                    ...initState
                }
                break;
            case userConstants.LOGOUT_FAILURE:
                state = {
                    ...state,
                    error: action.payload.error,
                    loading: false,
                }
                break;

    }

    return state;
}