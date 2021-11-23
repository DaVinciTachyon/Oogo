import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "./components/util/PrivateRoute"

import LogIn from "./components/LogIn"
import SignUp from "./components/SignUp"
import BasicSignUp from "./components/BasicSignUp"
import MinderSignUp from "./components/MinderSignUp"
import HomePage from "./components/HomePage"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<PublicRoute/>}>
          <Route exact path='/login' element={<LogIn/>}/>
        </Route>
        <Route exact path='/signup' element={<PublicRoute/>}>
          <Route exact path='/signup' element={<SignUp/>}/>
        </Route>
        <Route exact path='/signup/minder' element={<PublicRoute/>}>
          <Route exact path='/signup/minder' element={<MinderSignUp/>}/>
        </Route>
        <Route exact path='/signup/parent' element={<PublicRoute/>}>
          <Route exact path='/signup/parent' element={<BasicSignUp role='parent'/>}/>
        </Route>
        <Route exact path='/signup/admin' element={<PublicRoute/>}>
          <Route exact path='/signup/admin' element={<BasicSignUp role='admin'/>}/>
        </Route>
        <Route exact path='/' element={<PrivateRoute/>}>
          <Route exact path='/' element={<HomePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
