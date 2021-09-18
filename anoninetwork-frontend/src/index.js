import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';

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

ReactDOM.render(
  <div className="background">
    <Background />
    <div className="container container-shadow" style={{marginTop: 20}}>
      <React.StrictMode>
        <BrowserRouter>
          <Route exact path="/" component={HomeScreen} />
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
          Per scoprire come funziona l'anonimato su Anoninetwork <a href="/anonimato">clicca qui</a><br/>
          Per problemi contattatemi a questa email: <a href="mailto: patrickcanal3@gmail.com?subject = Anononinetwork issue">patrickcanal3@gmail.com</a><br/>
          Se vuoi diventare un moderatore del sito <a href="/becomemoderator">clicca qui</a>
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
