// import {
//   USER_START,
//   USER_SUCCESS,
//   USER_FAIL,
//   USER_NOT_SIGNED,
//   CLEAR_USER
// } from "../constants/ActionTypes";

import * as actionTypes from "../constants/ActionTypes";
import { updateObject } from "../store/utility";

const initialState = {
  user: {},
  error: null,
  loading: false
};

const userStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const userNotSigned = (state, action) => {
  return updateObject(state, {
    user: {},
    loading: false
  });
};

const userSuccess = (state, action) => {
  return updateObject(state, {
    user: action.data,
    error: null,
    loading: false
  });
};

const userFail = (state, action) => {
  // console.log(action);
  return updateObject(state, {
    user: null,
    // user: action.error,
    loading: false,
    error: action.error
  });
};

const userClear = (state, action) => {
  // console.log("cleairng user");
  return updateObject(state, {
    user: {},
    error: null,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  // console.log(action.type);
  switch (action.type) {
    case actionTypes.USER_START:
      return userStart(state, action);
    case actionTypes.USER_SUCCESS:
      return userSuccess(state, action);
    case actionTypes.USER_FAIL:
      return userFail(state, action);
    case actionTypes.USER_NOT_SIGNED:
      return userNotSigned(state, action);
    case actionTypes.CLEAR_USER:
      return userClear(state, action);
    default:
      return state;
  }
};

export default reducer;
