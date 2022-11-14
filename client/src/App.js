import './App.css';
import React from 'react';
import LandingPage from "./Components/LandingPage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 import Home from "./Components/Home";
 import Details from "./Components/Details";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Switch>
          <Route exact path='/'><LandingPage /></Route>
          <Route exact path='/home'><Home /></Route>
          <Route exact path='/home/:id'><Details /></Route> 
          {/* <Route exact path='/dogs'><DogCreate /></Route>  */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
