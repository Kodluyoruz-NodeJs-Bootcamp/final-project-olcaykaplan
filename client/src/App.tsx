import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
function App() {
  const google = () => {
    window.open("http://localhost:5000/api/auth/google", "_self")
  }
  const facebook = () => {
    window.open("http://localhost:5000/api/auth/facebook", "_self")
  }
  return (
    <div className="App">
      <button style={{width:"150px", height:"50px"}} onClick={google}>google</button>
      <button style={{width:"150px", height:"50px"}} onClick={facebook}>facebook</button>
    </div>   
  );
}

export default App;
