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
  DetailPage
} from "./pages";
import { useAuth } from "./hooks/auth.hook";

import { AuthContext } from "./context/authContext";
import { useDispatch, useSelector } from "react-redux";

import { getAds, deleteAd } from "./actions/ads";
import { Breadcrumbs } from './components/Breadcrumbs';

import { deletPhotoInFirebase } from "./utils";

const Routes = ({ isAuthenticated }) => {

  if (isAuthenticated) {
    return (
      <Switch>

        <Route path="/" exact><MainPage isAuth={isAuthenticated} /> </Route>

        <Route path="/ads" component={AllAdsPage} />
        <Route path="/categories" exact component={CategoriesPage} />
        <Route path="/about" exact component={AboutPage} />
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/detail/:id" component={DetailPage} />
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
        <Redirect to='/auth' />
      </Switch>
    )
  }
}

function App() {
  const { token, userId, login, logout, userName, userAds } = useAuth();
  const isAuthenticated = !!token;

  const ads = useSelector(state => state.ads);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  useEffect(() => {
    // auto delete ads who time is out logic 
    if (ads) {ads.forEach(element => {
      if (element.timeOut <= new Date().getTime()) {
          dispatch(deleteAd(element._id));            
          element.photoName.forEach( pn => deletPhotoInFirebase(pn));
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, userName, userId, login, logout, isAuthenticated, userAds }}>
      <Router>
        <div className="container max-w-screen-xxl">
          <Navbar isAuth={isAuthenticated} />
          <Breadcrumbs />
          <div className="m-auto pt-2 max-w-screen-xl">
            <Routes isAuthenticated={isAuthenticated} />
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
