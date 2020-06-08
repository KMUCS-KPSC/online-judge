import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Landing from './pages/landing';
import NavBar from './components/navBar';
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <Router>
        <Switch>
          <Route path='/'
                 render={() => <div><NavBar/><Landing/></div>}/>
        </Switch>
      </Router>
  );
}

export default App;
