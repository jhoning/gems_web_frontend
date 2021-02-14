import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from '../pages/Login'
import T_board from '../pages/T_board';
import Register from '../pages/Register'
import UserSettings from '../pages/UserSettings'
import calculo from '../pages/calculo'
import '../css/Main.css'



import i18n from '../i18n';
export default function Routes() {
    return (
       
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/t-board" component={T_board}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/user_settings" component={UserSettings}/>
                    <Route exact path="/calculo" component={calculo}/>
                </Switch>
            </BrowserRouter>
        
    );  
}