import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import { ProductList } from './Components/ProductList.js';
import { ProductDetail } from './Components/ProductDetail.js';
import { ShoppingBasket } from './Components/ShoppingBasket.js';

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headLine: '',
      //redirectList: true,
      incomminAuthors: [],
    }
  }
 // Add css roule for headline if PD, wither and text-align: center;
  render() { 
    return (
      <main>
        <Router>
          <Helmet>
          <meta charSet="utf-8" />
          <title>{'Webhshopp'}</title>
          </Helmet>
          <div id="appBody">
          <p className="headLine">Webbshopp</p>
            <div id="headLinks">
              <Link to="/"><p>Produktlistan</p></Link>
            </div>

            <Route exact path="/" component={ ProductList }/>
            <Route exact path="/ProductDetail/:id" component={ ProductDetail }/>
            <Route exact path="/ShoppingBasket" component={ ShoppingBasket }/>


          </div>
      </Router>
      </main>
    );
  }
}

export default MainApp;