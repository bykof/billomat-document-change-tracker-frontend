import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
