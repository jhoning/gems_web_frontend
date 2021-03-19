import React from 'react';
import ReactDOM from 'react-dom';
import './i18n'
import Routes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

ReactDOM.render(
  <React.StrictMode>

    <Routes/>

  </React.StrictMode>,
  document.getElementById('root')
);


