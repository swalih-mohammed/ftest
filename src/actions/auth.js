import axios from "axios";
import * as actionTypes from "../constants/ActionTypes";
// import { fetchUser } from "./user";
import { login, signUp } from "../constants";
// import { authAxios } from "../authAxios";
import { userTypeURL } from "../constants";
import { endpoint } from "../constants";
import {
  USER_START,
  USER_SUCCESS,
  USER_FAIL,
  USER_NOT_SIGNED,
  CLEAR_USER
} from "../constants/ActionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const userProfile = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
      dispatch(clearUser());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  // console.log(store.auth.token);
  return dispatch => {
    dispatch(authStart());
    axios
      // .post(login, {
      // .post("https://www.localdukans.com/rest-auth/login/", {
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 604800 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(fetchUser(token));
        dispatch(checkAuthTimeout(604800));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("https://www.localdukans.com/rest-auth/registration/", {
        // .post("http://127.0.0.1:8000/rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 604800 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(604800));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const resetPassword = () => {
  console.log("not yet");
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
        dispatch(clearUser());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 10000
          )
        );
      }
    }
  };
};

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

export const clearUser = () => {
  // console.log("clearing action");
  return {
    type: CLEAR_USER
  };
};

export const fetchUser = token => {
  const authAxios = axios.create({
    baseURL: endpoint,
    headers: {
      Authorization: `Token ${token}`
    }
  });
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
