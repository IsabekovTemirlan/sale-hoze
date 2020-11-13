import React from 'react';
import { Navbar } from "./components/Navbar";
import { MainPage } from "./pages/Main";


function App() {
  return (
    <div className="container max-w-screen-xxl">
      <Navbar />
      <MainPage />
    </div>
  );
}

export default App;
