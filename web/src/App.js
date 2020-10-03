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
import Footer from './components/footer';
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
      <Router>
        <NavBar/>
        <Switch>
          <Route path='/problem' component={Problem} />
          <Route path='/problems' component={Problems} />
          <Route path='/contest' component={Contest} />
          <Route path='/rank' component={Rank} />
          <Route path='/discuss' component={Discuss} />
          <Route path='/' component={Landing} />
        </Switch>
      </Router>
  );
}

export default App;
