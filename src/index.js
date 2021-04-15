import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch} from 'react-router-dom';
import reducers from './reducers'
import { Route } from 'react-router-dom'
import { Suspense } from 'react';

import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

const AppContainer =React.lazy(()=>import('./components/AppContainer'))
const Register = React.lazy(()=>import('./components/pages/Register'));

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
      <Switch>
      <Route path="/register" component={Register}/>
      <Route path="/" component={AppContainer}/>
      </Switch>
      </Suspense>
    </BrowserRouter>
  </Provider>,
document.getElementById('root')
);