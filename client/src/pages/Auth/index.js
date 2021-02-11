import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { loginAdmin, loginUser, registerUser } from "../../api";
import { AuthContext } from "../../context/authContext";
import { SET_ALERT } from "../../types";
import AuthPageContainer from "./Auth";

export const AuthPage = ({ isAdmin }) => {
  let [userData, setUserData] = useState({ login: '', password: '', email: '' });
  const [isRegister, setIsResgister] = useState(false);

  const auth = useContext(AuthContext)
  const dispatch = useDispatch();

  const fieldChanged = e => setUserData({ ...userData, [e.target.name]: e.target.value });

  const loginSubmit = async () => {
    setIsResgister(false);
    if (userData.login.length && (userData.password.length >= 6)) {

      try {
        const data = (isAdmin ? await loginAdmin(userData) : await loginUser(userData));
        const result = data.data;

        if (result) {
          dispatch({ type: SET_ALERT, payload: { text: result.msg } })
          auth.login(result.token, result.userId, result.userName, result.userAds, result.isAdmin);
        }

      } catch ({ response }) {
        const message = response.data.message;
        dispatch({ type: SET_ALERT, payload: { text: message, type: response.status } });
      }
      if (isAdmin) { window.location.href = '/dashboard'; }
    }
  }

  const registerSubmit = async () => {
    setIsResgister(true);
    if (userData.login.length && (userData.password.length >= 6) && userData.email.length) {
      try {
        const data = await registerUser(userData);
        const result = data.data;

        if (result) { dispatch({ type: SET_ALERT, payload: { text: result.message, type: 200 } }) }
      } catch ({ response }) {
        const message = response.data.message;
        dispatch({ type: SET_ALERT, payload: { text: message, type: response.status } });
      }
    }
  }

  return <AuthPageContainer
    isAdmin={isAdmin}
    isRegister={isRegister}
    fieldChanged={fieldChanged}
    loginSubmit={loginSubmit}
    registerSubmit={registerSubmit}
    userData={userData}
    auth={auth}
  />
}