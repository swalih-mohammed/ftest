// import { CART_START, CART_SUCCESS, CART_FAIL } from "./actionTypes";
import {
  USER_START,
  USER_SUCCESS,
  USER_FAIL,
  USER_NOT_SIGNED,
  CLEAR_USER
} from "../constants/ActionTypes";
import { authAxios } from "../authAxios";
import { userTypeURL } from "../constants";

export const userStart = () => {
  return {
    type: USER_START
  };
};

export const userSuccess = data => {
  return {
    type: USER_SUCCESS,
    data
  };
};

export const userFail = error => {
  return {
    type: USER_FAIL,
    error: error
  };
};

export const notSigned = error => {
  return {
    type: USER_NOT_SIGNED
    // error: error
  };
};

export const clearUser = () => {
  console.log("clearing action");
  return {
    type: CLEAR_USER
  };
};

export const fetchUser = () => {
  // console.log(state.token);
  return dispatch => {
    dispatch(userStart());
    authAxios
      .get(userTypeURL)
      .then(res => {
        dispatch(userSuccess(res.data));
      })
      .catch(err => {
        if (err.response.status === 401) {
          dispatch(notSigned);
        } else {
          dispatch(userFail(err));
        }
      });
  };
};
