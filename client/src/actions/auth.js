import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./creators/authTypes";

export const registerUser = (userData, history) => {
  return dispatch => {
    return axios
      .post("/api/register", userData)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        if (error.response.status === 401) {
          alert("Registration failed. Username or password has been taken");
        }
      });
  };
};

export const loginUser = userData => {
  return dispatch => {
    return axios.post("/api/login", userData).then(result => {
      console.log(result);
      localStorage.setItem("jwtToken", result.data.token);
      setAuthToken(result.data.token);
      dispatch(setCurrentUser(jwtDecode(result.data.token)));
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
