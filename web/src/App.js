import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Landing from './pages/landing';
import Problem from './pages/problem';
import Problems from './pages/problems';
import Contest from './pages/contest';
import Rank from './pages/rank';
import Discuss from './pages/discuss';
import NavBar from './components/navBar';
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <Router>
        <NavBar/>
        <Switch>
          <Route path='/problem'
                 render={() => <div><Problem/></div>}/>
          <Route path='/problems'
                 render={() => <div><Problems/></div>}/>
          <Route path='/contest'
                 render={() => <div><Contest/></div>}/>
          <Route path='/rank'
                 render={() => <div><Rank/></div>}/>
          <Route path='/discuss'
                 render={() => <div><Discuss/></div>}/>
          <Route path='/'
                 render={() => <div><Landing/></div>}/>
        </Switch>
      </Router>
  );
}

export default App;
