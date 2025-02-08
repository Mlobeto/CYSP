import {
  
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
 


} from "../Actions/actions-types";

const initialState = {
  adminInfo: null,
 
  token: null,
 
 
  loading: false,
  error: null,
  
  }



const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        adminInfo: action.payload.admin,
        token: action.payload.token,
        error: null,
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

   
    default:
      return state;
  }
};

export default rootReducer;
