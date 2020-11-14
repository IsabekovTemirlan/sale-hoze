import React, { useEffect } from 'react';
import  {useDispatch } from "react-redux";

import {getAds} from './actions/ads';
import { Navbar } from "./components/Navbar";
import { MainPage } from "./pages/Main";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch])

  return (
    <div className="container max-w-screen-xxl">
      <Navbar />
      <MainPage />
    </div>
  )
}

export default App;
