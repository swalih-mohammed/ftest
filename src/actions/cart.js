import {
  CART_START,
  CART_SUCCESS,
  CART_FAIL,
  CART_CLEAR
} from "../constants/ActionTypes";
import { authAxios } from "../authAxios";
import { orderSummaryURL } from "../constants";

export const cartStart = () => {
  return {
    type: CART_START
  };
};

export const cartSuccess = data => {
  return {
    type: CART_SUCCESS,
    data
  };
};

export const cartFail = error => {
  return {
    type: CART_FAIL,
    error: error
  };
};

export const clearCart = () => {
  // console.log("clearing action");
  return {
    type: CART_CLEAR
  };
};

// export const fetchCart = () => {
//   return dispatch => {
//     dispatch(cartStart());
//     authAxios
//       .get(orderSummaryURL)
//       .then(res => {
//         dispatch(cartSuccess(res.data));
//       })
//       .catch(err => {
//         // if (err.response.status === 404) {
//         //   dispatch(clearCart);
//         // } else {
//         //   // this.setState({ error: err, loading: false });
//         //   dispatch(cartFail(err));
//         // }
//         dispatch(cartFail(err));
//         // dispatch(cartSuccess(res.data));
//       });
//   };
// };

export const fetchCart = () => {
  return dispatch => {
    dispatch(cartStart());
    authAxios
      .get(orderSummaryURL)
      .then(res => {
        dispatch(cartSuccess(res.data));
      })
      .catch(err => {
        dispatch(cartFail(err));
      });
  };
};

export const clearKart = () => {
  return dispatch => {
    dispatch(clearCart());
  };
};
