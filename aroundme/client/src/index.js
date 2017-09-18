import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root';
import store from "./store"
import { Provider } from "react-redux"
import * as ServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'));

ServiceWorker.unregister();
