/* import React, {useState,useEffect} from 'react'
import { BrowserRouter, Switch, Route,Redirect } from 'react-router-dom'
import Home_tboard from '../containers/Home_tboard';
import UserSettings from '../components/UserSettings';
import Calculate1 from '../containers/Calculate1';
import {PrivateRoute} from './RoutesHelper'
const PrivateRoutes = () => {
 const [isAuthenticated, userHasAuthenticated] = useState(false);

 useEffect(() => {
   onLoad();
 }, []);

 function onLoad() {
   const aux =  localStorage.getItem('token')
    if(aux != null){
     userHasAuthenticated(true);
    }else {

    }
    
 }
  return (isAuthenticated?
    <Switch>
      <PrivateRoute exact path="/t_board" component={Home_tboard}/>
      <PrivateRoute exact path="/UserSettings" component={UserSettings}/>
      <PrivateRoute path="/calculate/:id1" component={Calculate1}/>
      <Redirect path="/**" to="/"/>
     
     
    </Switch>:null
  )
}

export default PrivateRoutes */