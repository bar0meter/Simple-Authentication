import { AUTH_USER, AUTH_ERROR } from "./types";
import axios from "axios";

export const signup = (formProps, callback) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "http://localhost:8000/signup",
        formProps
      );
      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem("token", response.data.token);
      callback();
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: "Email in use" });
    }
  };
};

export const signin = (formProps, callback) => {
  return async dispatch => {
    try {
      const response = await axios.post(
        "http://localhost:8000/signin",
        formProps
      );
      dispatch({ type: AUTH_USER, payload: response.data.token });
      localStorage.setItem("token", response.data.token);
      callback();
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: "Invalid Login credentials" });
    }
  };
};

export const signout = () => {
  localStorage.removeItem("token");

  return {
    type: AUTH_USER,
    payload: ""
  };
};
