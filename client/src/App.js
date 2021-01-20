import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAuth } from "./hooks/auth.hook";
import { Navbar } from "./components/Navbar";
import { Breadcrumbs } from './components/Breadcrumbs';
import { Routes } from "./routes";
import { Alert } from './components/Alert';
import { AuthContext } from "./context/authContext";
import { getAds } from './actions/ads';
import "./app.css";

function App() {
  const { token, userId, login, logout, userName, userAds, userType } = useAuth();
  const [page, setPage] = useState(1);
  const isAuthenticated = !!token;
  const dispatch = useDispatch();

  useEffect(() => { dispatch(getAds(page)) }, [page, dispatch]);

  const greetingFlag = JSON.parse(localStorage.getItem("isVisiting"));
  if (!greetingFlag) { localStorage.setItem("isVisiting", JSON.stringify(true)) }

  return <AuthContext.Provider value={{ token, userName, userId, login, logout, isAuthenticated, userAds, userType }}>
    <Router>
      <div className={!userType ? "container max-w-screen-xl mx-auto" : null}>
        {userType ? <Navbar isAuth={isAuthenticated} isAdmin /> : <Navbar isAuth={isAuthenticated} />}
        {!userType && <Breadcrumbs />}
        <div className="mx-auto max-w-screen">
          {alert ? <Alert title={alert.text} type={alert.type} /> : null}
          <Routes isAuthenticated={isAuthenticated} userId={userId} page={page} setPage={setPage} />
        </div>
      </div>
    </Router>
  </AuthContext.Provider>
}

export default App;