import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import AddProduct from './components/AddProduct/AddProduct';
import Checkout from './components/Checkout/Checkout';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Orders from './components/Orders/Orders';
import Admin from './components/Admin/Admin';
import Header from './components/Header/Header';
import ManageProduct from './components/ManageProduct/ManageProduct';

export const PageContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5055/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

  return (
    <PageContext.Provider value={([loggedInUser, setLoggedInUser],[products, setProducts])}>
    <Router>
    <Header/>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/checkout/:id">
         <Checkout/>
        </Route>
        <PrivateRoute path="/orders">
         <Orders/>
        </PrivateRoute>
        <Route path="/admin">
         <Admin/>
        </Route>
        <Route path="/manage-product">
         <ManageProduct/>
        </Route>
        <Route path="/addProduct">
          <AddProduct/>
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
  </Router>
  </PageContext.Provider>
);
}

export default App;