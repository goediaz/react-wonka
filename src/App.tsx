import React from 'react';
import { Route, Switch } from "wouter";
import Home from './pages/Home/home';
import Description from './pages/Description/description';
import Header from './components/Header/header';

function App() {
  return (
    <div>
      <Header />
      <div className="main-container">
        <Switch>
          <Route component={Home} path="/" />
          <Route component={Description} path="/:id" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
