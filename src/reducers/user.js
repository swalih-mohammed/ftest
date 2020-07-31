import { USER_START, USER_SUCCESS, USER_FAIL } from "../constants/ActionTypes";
import { updateObject } from "../store/utility";

const initialState = {
  user: null,
  error: null,
  loading: false
};

const userStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
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
    error: action.error,
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
    default:
      return state;
  }
};

export default reducer;
