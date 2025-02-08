
import axios from 'axios';
import Swal from "sweetalert2";


import {
REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL,


} from './actions-types'

export const registerAdmin = (adminData) => async (dispatch) => {
    try {
        const response = await axios.post('/auth/register', adminData);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        });
    }
};


export const loginAdmin = (adminData) => async (dispatch) => {
    try {
        const response = await axios.post('/auth/login', adminData);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        });
    }
};


