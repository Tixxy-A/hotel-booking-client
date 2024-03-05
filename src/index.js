import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import DataProvider from './SLA/Sladata';
import { BrowserRouter } from 'react-router-dom'
//import Test from'./Test';
import App from './App';
//import Table from './Filtertable'
//import Feature from './Card'
//import Data from './Data'
//import Data2 from './Data2'
//import Admin from './Admin/Admin'
//import Sla from './sla'
//import Update from './Update'
//import SLAtemplate from './SLA/Slatemplate';
//import Slaform from './SLA/Slaform';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
   <App/>
   </BrowserRouter>

   

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
