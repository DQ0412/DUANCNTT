import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // 🟢 Đảm bảo import đúng
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';
import "antd/dist/antd.css";
import "leaflet/dist/leaflet.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter> {/* 🟢 Đảm bảo App nằm trong Router */}
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
