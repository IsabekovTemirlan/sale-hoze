import React, {useState, useContext} from "react";
import {loginUser, registerUser} from "../api";
import {AuthContext} from "../context/authContext";

export const AuthPage = () => {
  const [alert, setAlert] = useState({message: "", show: false});
  let [userData, setUserData] = useState({login: '', password: ''});
  const auth = useContext(AuthContext)

  const fieldChanged = e => setUserData({...userData, [e.target.name]: e.target.value});

  const loginSubmit = async () => {
    if (userData.login.length && (userData.password.length >= 6)) {

      try {
        const data = await loginUser(userData);
        const result = data.data;

        if (result) {
          setAlert({message: result.msg, show: true, type: result.status});
          auth.login(result.token, result.userId, result.userName, result.userAds);
        }
      } catch ({response}) {
        const message = response.data.message;
        setAlert({message, show: true});
      }
    }
  }

  const registerSubmit = async () => {
    if (userData.login.length && (userData.password.length >= 6)) {
      try {
        const data = await registerUser(userData);
        const result = data.data;

        if (result) {
          setAlert({message: result.message, show: true})
        }
      } catch ({response}) {
        const message = response.data.message;
        setAlert({message, show: true});
      }
    }
  }

  return (
    <div className="w-full m-auto mt-32 max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={e => e.preventDefault()}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            name="loginSubmit"
            onClick={loginSubmit}
          >Войти
          </button>

          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            name="registerSubmit"
            onClick={registerSubmit}
          >Зарегистрироватьяся
          </button>
        </div>


      </form>
      {alert.show && (
        <div
          className={`max-w-xs ${alert.type === 400 ? 'bg-red-200 border-red-800' : 'bg-green-200'} px-4 py-2 mb-2 rounded border border-green-800`}>
          <p className="mt-25 text-bgColor font-bold text-center text-sm">{alert.message}</p>
        </div>
      )}
    </div>
  )
}