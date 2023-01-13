import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from '../src/components/app/app';
import Provider from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);



