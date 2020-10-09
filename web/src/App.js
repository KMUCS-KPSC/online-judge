import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './pages/landing'
import CodingTest from './pages/codingTest'
import Problem from './pages/problem'
import Problems from './pages/problems'
import Contests from './pages/contests'
import Rank from './pages/rank'
import Discuss from './pages/discuss'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route
          path="/codingtest/:id"
          component={({ match }) => <CodingTest match={match} />}
        />
        <Route path="/problem/:id" component={Problem} />
        <Route path="/problems" component={Problems} />
        <Route path="/contests" component={Contests} />
        <Route path="/rank" component={Rank} />
        <Route path="/discuss" component={Discuss} />
        <Route path="/" component={Landing} />
      </Switch>
    </Router>
  )
}

export default App
