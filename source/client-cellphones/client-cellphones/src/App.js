import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';  // ❌ Xóa BrowserRouter ở đây
import './App.css';

// Import các trang chính
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductPage from './pages/ProductPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import SearchPage from './pages/SearchPage';
import MyOrderPage from './pages/MyOrderPage';
import ChatPage from './pages/ChatPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import AdminPage from './pages/AdminPage';

// Component phụ trợ
import ResetScroll from './components/ResetScroll/ResetScroll';

// 🟢 Fix lỗi pathname undefined
const NotFoundPage = () => {
  const location = useLocation(); // 🟢 Đúng rồi, không cần sửa
  return <h1>404 - Page Not Found at {location.pathname}</h1>;
};

function App() {
  return (
    <div className="App">
      <ResetScroll />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={SignupPage} />
        <Route path="/product" exact component={ProductPage} />
        <Route path="/detail/:id" exact component={DetailPage} />
        <Route path="/cart" exact component={CartPage} />
        <Route path="/order" exact component={OrderPage} />
        <Route path="/orderSuccess" exact component={OrderSuccessPage} />
        <Route path="/payment" exact component={PaymentPage} />
        <Route path="/myOrder" exact component={MyOrderPage} />
        <Route path="/search" exact component={SearchPage} />
        <Route path="/chat" exact component={ChatPage} />
        <Route path="/admin" component={AdminPage} />

        {/* 🔥 Fix lỗi pathname undefined */}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
