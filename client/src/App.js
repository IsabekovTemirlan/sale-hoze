import React, { useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "./components/Navbar";
import { Breadcrumbs } from './components/Breadcrumbs';
import { Routes } from "./routes";
import { Alert } from './components/Alert';
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/authContext";
import { getAds, deleteAd } from "./actions/ads";
import { getUsers } from "./actions/users";
import { deletPhotoInFirebase } from "./utils";
import "./app.css";

function App() {
  const { token, userId, login, logout, userName, userAds, userType } = useAuth();
  const isAuthenticated = !!token;

  const ads = useSelector(state => state.ads);
  const dispatch = useDispatch();
  const greetingFlag = JSON.parse(localStorage.getItem("isVisiting"));

  useEffect(() => {
    if (!greetingFlag) { localStorage.setItem("isVisiting", JSON.stringify(true)); }
    dispatch(getAds());
    if (token && userType) { dispatch(getUsers(token)); }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // auto delete ads who time is out logic 
    if (ads.length) {
      ads.forEach(element => {
        const date1 = new Date(element.createdAt.toString());
        const date2 = new Date();
        const daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));

        if (daysLag >= element.killDate) {
          dispatch(deleteAd(element._id, userId));
          element.photoName.forEach(pn => deletPhotoInFirebase(pn));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ token, userName, userId, login, logout, isAuthenticated, userAds, userType }}>
      <Router>
        <div className={!userType ? "container max-w-screen-xl mx-auto" : null}>
          {userType ? <Navbar isAuth={isAuthenticated} isAdmin /> : <Navbar isAuth={isAuthenticated} />}
          {!userType && <Breadcrumbs />}
          <div className="mx-auto max-w-screen">
            {alert ? <Alert title={alert.text} type={alert.type} /> : null}
            <Routes isAuthenticated={isAuthenticated} userId={userId} />
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;