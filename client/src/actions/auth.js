import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./creators/authTypes";
import { GET_ERRORS } from "./types";

export const registerUser = (userData, history) => {
  return dispatch => {
    return axios
      .post("/api/register", userData)
      .then(result => {
        console.log(result);
      })
      .catch(error => console.log(error));
  };
};

export const loginUser = userData => {
  return dispatch => {
    return axios.post("/api/login", userData).then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(logoutUser());
  };
};
