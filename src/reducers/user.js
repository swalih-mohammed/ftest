import {
  USER_START,
  USER_SUCCESS,
  USER_FAIL,
  USER_NOT_SIGNED,
  CLEAR_USER
} from "../constants/ActionTypes";
import { updateObject } from "../store/utility";

const initialState = {
  user: "Customer",
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
    user: "Customer",
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
  return updateObject(state, {
    user: action.error,
    loading: false
  });
};

const userClear = (state, action) => {
  // console.log("cleairng use");
  return updateObject(state, {
    user: null,
    error: null,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_START:
      return userStart(state, action);
    case USER_SUCCESS:
      return userSuccess(state, action);
    case USER_FAIL:
      return userFail(state, action);
    case USER_NOT_SIGNED:
      return userNotSigned(state, action);
    case CLEAR_USER:
      return userClear(state, action);
    default:
      return state;
  }
};

export default reducer;
