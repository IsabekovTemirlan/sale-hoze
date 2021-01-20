import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import {
  MainPage,
  AboutPage,
  AdvertisePage,
  CategoriesPage,
  AuthPage,
  ProfilePage,
  DetailPage,
  AdminPanel,
  UserPage,
  FavoritePage
} from "./pages";

export const Routes = ({ isAuthenticated, userId, page, setPage }) => {
  const { userType } = useAuth();

  if (isAuthenticated && userType) {
    return (
      <div className="pt-10">
        <Switch>
          <Route path="/dashboard" exact >
            <AdminPanel userId={userId} />
          </Route>
          <Route path="/users/:id" component={UserPage} />
          <Route path="/detail/:id" component={DetailPage} />
          <Redirect to='/dashboard' />
        </Switch>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact><MainPage isAuth={isAuthenticated} page={page} setPage={setPage} /> </Route>
        <Route path="/categories" exact component={CategoriesPage} />
        <Route path="/about" exact component={AboutPage} />
        <Route path="/favorites" exact >
          <FavoritePage userId={userId} />
        </Route>
        <Route path="/advertise" exact> <AdvertisePage isAuth={isAuthenticated} userId={userId} /></Route>
        <Route path="/profile" exact component={ProfilePage} />
        <Route path="/detail/:id" >
          <DetailPage isAuth={isAuthenticated} userId={userId} />
        </Route>
        <Route path="/admin" exact>
          <AuthPage isAdmin />
        </Route>
        <Redirect to='/profile' />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path="/" exact> <MainPage page={page} setPage={setPage} /></Route>
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