import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  USER_LOADING
} from "./creators/authTypes";
// Register User
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

// Login - get user token
export const loginUser = userData => dispatch => {
  axios.post("/api/login", userData).then(result => {
    console.log(result);
    localStorage.setItem("jwtToken", result.data.token);
  });
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// // Get current user
// export const getCurrentUser = () => dispatch => {
//   dispatch(setUserLoading());
//   axios
//     .get("/api/currentuser")
//     .then(res =>
//       dispatch({
//         type: GET_CURRENT_USER,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
