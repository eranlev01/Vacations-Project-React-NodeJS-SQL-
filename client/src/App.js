import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import Vacations from './components/Vacations';
import Login from './components/Login';
import Register from './components/Register';
import Reports from './components/Reports';
import NotFound from './components/NotFound';




function App() {

  useEffect(() => {

  }, [])


  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
         <Route path="/login" component={Login}></Route>
         <Route  path="/vacations" component={Vacations} ></Route>
         <Route path="/register" component={Register}></Route>
         <Route path="/reports" component={Reports}></Route>
         <Redirect exact from="/" to="vacations" exact/>
         <Route path="*" component={NotFound} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    vacations: state.vacations
  }
}
export default connect(mapStateToProps)(App)
