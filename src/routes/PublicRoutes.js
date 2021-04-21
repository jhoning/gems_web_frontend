import React from 'react'
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom'
import { LoginForm } from '../containers/LoginForm';
import Register from '../components/Register';
import Recover from '../containers/Recover';
import ChangePassword from '../containers/ChangePassword';
import MessageEmail from '../components/MessageEmail';
import Code from '../containers/Code';
import {PublicRoute} from './RoutesHelper'
const PublicRoutes = () => {
  
  return (
    <Switch>
      <PublicRoute exact path="/" component={LoginForm}/>
      <PublicRoute exact path="/register" component={Register}/>
      <PublicRoute exact path="/recover" component={Recover}/>
      <PublicRoute exact path="/code" component={Code}/>
      <PublicRoute path="/message/:token" component={MessageEmail}/>
      <PublicRoute path="/change/:token" children={ChangePassword}/>
    
     
     
    </Switch>    
  )
}

export default PublicRoutes
