import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  GET_CURRENT_USER,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types/authTypes";
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/register", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      // const { token } = res.data;
      // localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      // setAuthToken(token);
      // // Decode token to get user data
      // const decoded = jwt_decode(token);
      // // Set current user
      // dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
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
