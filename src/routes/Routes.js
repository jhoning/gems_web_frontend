import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { LoginForm } from '../containers/LoginForm';
import Register from '../components/Register';
import Home_tboard from '../containers/Home_tboard';
import UserSettings from '../components/UserSettings';
import Calculate1 from '../containers/Calculate1';
import Recover from '../containers/Recover';
import ChangePassword from '../containers/ChangePassword';
import MessageEmail from '../components/MessageEmail';
import Code from '../containers/Code';

export default function Routes() {
  return (
    <BrowserRouter>
      
      <Switch>
        <Route exact path="/" component={LoginForm}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/recover" component={Recover}/>
        <Route exact path="/code" component={Code}/>
        <Route path="/message/:token" component={MessageEmail}/>
        <Route path="/change/:token" children={ChangePassword}/>
        <Route exact path="/t_board" component={Home_tboard}/>
        <Route exact path="/user_settings" component={UserSettings}/>
        <Route path="/calculate/:id1/:name" component={Calculate1} />
     </Switch>
    </BrowserRouter>
  );  
}