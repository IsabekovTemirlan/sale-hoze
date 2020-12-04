import React, {useEffect} from 'react';

import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import {Navbar} from "./components/Navbar";
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
import {useAuth} from "./hooks/auth.hook";

import {AuthContext} from "./context/authContext";
import {useDispatch} from "react-redux";

import {getAds} from "./actions/ads";

const Routes = ({isAuthenticated}) => {

  if (isAuthenticated) {
    return (
      <Switch>

        <Route path="/" exact><MainPage isAuth={isAuthenticated}/> </Route>

        <Route path="/ads" component={AllAdsPage}/>
        <Route path="/categories" exact component={CategoriesPage}/>
        <Route path="/about" exact component={AboutPage}/>
        <Route path="/profile" exact component={ProfilePage}/>
        <Route path="/detail/:id" component={DetailPage}/>
        <Redirect to='/profile'/>
      </Switch>
    )
  }

  return (
    <Switch>

      <Route path="/" exact> <MainPage isAuth={isAuthenticated}/></Route>

      <Route path="/ads" exact component={AllAdsPage}/>
      <Route path="/categories" exact component={CategoriesPage}/>
      <Route path="/advertise" exact component={AdvertisePage}/>
      <Route path="/about" exact component={AboutPage}/>
      <Route path="/auth" exact component={AuthPage}/>}
      <Route path="/detail/:id" component={DetailPage}/>
      <Redirect to='/auth'/>
    </Switch>
  )

}

function App() {
  const {token, userId, login, logout, userName, userAds} = useAuth();
  const isAuthenticated = !!token;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  return (
      <AuthContext.Provider value={{token, userName, userId, login, logout, isAuthenticated, userAds}}>
      <Router>
        <div className="container max-w-screen-xxl">
          <Navbar isAuth={isAuthenticated}/>
          <div className="m-auto pt-20 max-w-screen-xl">
            <Routes isAuthenticated={isAuthenticated}/>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
