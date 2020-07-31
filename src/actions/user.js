// import { CART_START, CART_SUCCESS, CART_FAIL } from "./actionTypes";
import { USER_START, USER_SUCCESS, USER_FAIL } from "../constants/ActionTypes";
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

export const fetchUser = () => {
  return dispatch => {
    dispatch(userStart());
    authAxios
      .get(userTypeURL)
      .then(res => {
        dispatch(userSuccess(res.data));
      })
      .catch(err => {
        dispatch(userFail(err));
      });
  };
};
