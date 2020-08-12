// import { CART_START, CART_SUCCESS, CART_FAIL } from "../actions/actionTypes";
import {
  CART_START,
  CART_SUCCESS,
  CART_FAIL,
  CART_CLEAR
} from "../constants/ActionTypes";
// import { updateObject } from "../utility";
import { updateObject } from "../store/utility";

const initialState = {
  shoppingCart: [],
  error: null,
  loading: false
};

const cartStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const cartSuccess = (state, action) => {
  // console.log(action.data);
  return updateObject(state, {
    shoppingCart: action.data,
    error: null,
    loading: false
  });
};

const cartFail = (state, action) => {
  return updateObject(state, {
    shoppingCart: action.data,
    loading: false
  });
};

const cartClear = (state, action) => {
  console.log("reducer");
  return updateObject(state, {
    shoppingCart: null,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_START:
      return cartStart(state, action);
    case CART_SUCCESS:
      return cartSuccess(state, action);
    case CART_FAIL:
      return cartFail(state, action);
    case CART_CLEAR:
      console.log("clear");
      return cartClear(state, action);
    default:
      return state;
  }
};

export default reducer;
