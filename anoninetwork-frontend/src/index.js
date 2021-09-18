import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';

import './background.svg';

//CSS
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "@pathofdev/react-tag-input/build/index.css";

//JS
import '../node_modules/bootstrap/dist/js/bootstrap';

//JSX
import HomeScreen from './Screens/HomeScreen';
import BecomeModScreen from './Screens/BecomeModScreen';
import Anonimato from './Screens/Anonimato';
import Background from './Components/Background';
import Query from './Screens/Query';

ReactDOM.render(
  <div className="background">
    <Background />
    <div className="container container-shadow attach-borders-top" style={{marginTop: 20}}>
      <React.StrictMode>
        <BrowserRouter>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/query/:query" component={Query} />
          <Route exact path="/becomemoderator" component={BecomeModScreen} />
          <Route exact path="/anonimato" component={Anonimato} />
          <Route exact path="/404">
            <h1>Error 404, page not found</h1>
          </Route>
        </BrowserRouter>
      </React.StrictMode>
    </div>
    <div className="footer">
      <div className="footer-content">
        <div style={{height: 20}}></div>
        <p className="footer-text">
          Created with &#10084; by Patrick Canal <br/>
          <a style={{color: 'white'}} target="_blank" href="https://github.com/Superredstone">Github profile</a><br/>
          <a style={{color: 'white'}} target="_blank" href="https://github.com/Superredstone/Anoninetwork">Project page</a>
        </p>
      </div>
    </div>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
