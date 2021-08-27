import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Home from './Container/Home';
import Login from './Container/Login';
import SignUp from './Container/SignUp';


function App() {
  

  return (
    <div className="App">
      <Switch>
        <Route path='/' exact component={Login}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/home' component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
