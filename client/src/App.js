import React, { useEffect } from 'react';

import { BrowserRouter as Router } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import {Routes} from "./routes";
import { useAuth } from "./hooks/auth.hook";

import { AuthContext } from "./context/authContext";
import { useDispatch, useSelector } from "react-redux";

import { getAds, deleteAd } from "./actions/ads";
import { getUsers } from "./actions/users";
import { Breadcrumbs } from './components/Breadcrumbs';

import { deletPhotoInFirebase } from "./utils";
import { Alert } from './components/Alert';

function App() {
  const { token, userId, login, logout, userName, userAds, userType } = useAuth();
  const isAuthenticated = !!token;

  const ads = useSelector(state => state.ads);
  const dispatch = useDispatch();

  useEffect(() => { 

    dispatch(getAds());  
    if (token && userType) {
      dispatch(getUsers(token));
    }

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
        <div className={!userType ? "container max-w-screen-xxl" : null}>
          {userType ? <Navbar isAuth={isAuthenticated} isAdmin /> : <Navbar isAuth={isAuthenticated} />}
          {!userType && <Breadcrumbs />}
          <div className="m-auto max-w-screen-xl">
            {alert ?<Alert title={alert.text} type={alert.type} /> : null}
            <Routes isAuthenticated={isAuthenticated} userId={userId}/>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;