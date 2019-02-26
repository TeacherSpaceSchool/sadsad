import {
    AUTHENTICATED,
    UNAUTHENTICATED,
    ERROR_AUTHENTICATED
} from '../constants/user'
import axios from 'axios';

export function signup(payload) {
    return async (dispatch) => {
        try {
            const res = await axios.post('/users/signup?email='+payload.email+'&password='+payload.password);
            localStorage.userBiletiki = res.data;
            dispatch({ type: AUTHENTICATED });
            window.location.reload()
        } catch(error) {
            alert( 'Неверный email!!!' );
            dispatch({
                type: ERROR_AUTHENTICATED,
                payload: 'Invalid email or password'
            });
        }
    };
}

export function signin(payload) {
    return async (dispatch) => {
        try {
            const res = await axios.post('/users/signin?email='+payload.email+'&password='+payload.password);
            localStorage.userBiletiki = res.data
            await dispatch({ type: AUTHENTICATED });
            window.location.reload()
        } catch(error) {
            alert( 'Неверный email или пароль!!!' );
            await dispatch({
                type: ERROR_AUTHENTICATED,
                payload: true
            })
        }
    };
}

export function checkAuthenticated() {
    return async (dispatch) => {
        try {
            if (localStorage.userBiletiki) {
                dispatch ({type: AUTHENTICATED});
            } else {
                dispatch ({type: UNAUTHENTICATED});
            }
        } catch (error) {
            dispatch ({type: UNAUTHENTICATED});
        }
    };
}

export function logout() {
    return async (dispatch) => {
        localStorage.removeItem('userBiletiki')
        dispatch({
            type: UNAUTHENTICATED,
        })
        window.location.reload()
    }
}