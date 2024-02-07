import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {ToastContainer} from 'react-toastify';
import {UserProvider} from './contexts/UserContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <ToastContainer />
    <UserProvider>
      <App />
    </UserProvider>
  </React.Fragment>
);
