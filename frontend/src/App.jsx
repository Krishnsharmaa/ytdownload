import React from 'react';
import "./App.css";
import Card from './Card';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div className="">
      <Card/>
      <ToastContainer />
    </div>
  );
}

export default App;
