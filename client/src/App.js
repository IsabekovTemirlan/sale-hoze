import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { Navbar } from "./components/Navbar";
import {
  MainPage,
  AboutPage,
  AdvertisePage,
  AllAdsPage,
  CategoriesPage,
  AuthPage,
  ProfilePage,
  DetailPage,
  AdminPanel,
  UserPage
} from "./pages";
import { useAuth } from "./hooks/auth.hook";

import { AuthContext } from "./context/authContext";
import { useDispatch, useSelector } from "react-redux";

import { getAds, deleteAd } from "./actions/ads";
import { getUsers } from "./actions/users";
import { Breadcrumbs } from './components/Breadcrumbs';

import { deletPhotoInFirebase } from "./utils";

const Routes = ({ isAuthenticated, userId, userType}) => {
    
  if (isAuthenticated && userType) {
    return (
      <Switch>
        <Route path="/dashboard" exact component={AdminPanel}/>
        <Route path="/users/:id" exact component={UserPage}/>
        <Redirect to='/dashboard' />
      </Switch>
    )
  }

  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact><MainPage isAuth={isAuthenticated} /> </Route>
        <Route path="/ads" component={AllAdsPage} />
        <Route path="/categories" exact component={CategoriesPage} />
        <Route path="/about" exact component={AboutPage} />
        <Route path="/advertise" exact> <AdvertisePage isAuth={isAuthenticated} userId={userId} /></Route>
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/detail/:id" component={DetailPage} />
        <Route path="/admin" exact>
          <AuthPage isAdmin />
        </Route>
        <Redirect to='/profile' />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path="/" exact> <MainPage isAuth={isAuthenticated} /></Route>
        <Route path="/ads" exact component={AllAdsPage} />
        <Route path="/categories" exact component={CategoriesPage} />
        <Route path="/advertise" exact component={AdvertisePage} />
        <Route path="/about" exact component={AboutPage} />
        <Route path="/auth" exact component={AuthPage} />
        <Route path="/detail/:id" component={DetailPage} />
        <Route path="/admin" exact>
          <AuthPage isAdmin />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    )
  }
}

function App() {
  const { token, userId, login, logout, userName, userAds, userType } = useAuth();
  const isAuthenticated = !!token;

  const ads = useSelector(state => state.ads);
  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getAds());
    if (token) {
      dispatch(getUsers(token))
    }
  }, [dispatch, token]);

  useEffect(() => {
    // auto delete ads who time is out logic 
    if (ads) {
      ads.forEach(element => {
        if (element.timeOut <= new Date().getTime()) {
          dispatch(deleteAd(element._id));
          element.photoName.forEach(pn => deletPhotoInFirebase(pn));
        }
      });
    }
  }, [ads, dispatch]);
  
  return (
    <AuthContext.Provider value={{ token, userName, userId, login, logout, isAuthenticated, userAds, userType }}>
      <Router>
        <div className={!userType ? "container max-w-screen-xxl" : null}>
          {userType ? <Navbar isAuth={isAuthenticated} isAdmin /> : <Navbar isAuth={isAuthenticated} />}
          {!userType && <Breadcrumbs />}
          <div className={!userType ? "m-auto pt-2 max-w-screen-xl" : null}>
            <Routes isAuthenticated={isAuthenticated} userId={userId} userType/>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;