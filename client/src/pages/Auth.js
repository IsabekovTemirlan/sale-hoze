import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { loginAdmin, loginUser, registerUser } from "../api";
import { AuthContext } from "../context/authContext";
import { SET_ALERT } from "../types";

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
    if (userData.login.length && (userData.password.length >= 6)) {
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

  return (
    <>
      <h2 className="text-3xl uppercase font-bold leading-tight font-heading text-center mt-2 w-full md:w-auto md:text-left">
        {isAdmin ? "Вход для администратора" : "Вход"}
      </h2>
      <div style={{top: "40%"}} className="w-full m-auto absolute left-0 right-0 max-w-xs page-enter">

        <form
          className="bg-white shadow-md rounded p-8 mb-4"
          onSubmit={e => e.preventDefault()}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login">
              Логин
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="login"
              type="text"
              value={userData.login}
              placeholder="Ваш логин"
              autoComplete="login"
              required
              onChange={fieldChanged}
            />
          </div>
          {auth.token || isAdmin || !isRegister ? null : (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                E-mail
            </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                value={userData.email}
                placeholder="Ваш email"
                autoComplete="email"
                required
                onChange={fieldChanged}
              />
            </div>
          )}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Пароль
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              type="password"
              required
              minLength="6"
              value={userData.password}
              placeholder="Ваш пароль"
              autoComplete="current-password"
              onChange={fieldChanged}
            />
          </div>

          <div className={"flex items-center justify-" + (isAdmin ? "center" : "between")}>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              name="loginSubmit"
              onClick={loginSubmit}
            >Войти
          </button>

            {isAdmin ? null : (<button
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              name="registerSubmit"
              onClick={registerSubmit}
            >Зарегистрироватьяся
            </button>)}
          </div>
        </form>
      </div>
    </>
  )
}