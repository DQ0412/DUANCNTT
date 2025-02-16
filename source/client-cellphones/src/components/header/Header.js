import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Header.css";
import { SignoutUser } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { searchProduct } from "../../actions/ProductAction";
import { Link } from "react-router-dom";
import {
  DownOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";

function Header(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showAccount, setShowAccount] = useState(false);
  const [showAccount2, setShowAccount2] = useState(false);
  const userSignin = useSelector((state) => state.userSignin) || {};
  const [userInfo, setUserInfo] = useState(userSignin.userInfo || null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, [userSignin]); 

  const [search, setSearch] = useState("");
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const amount = cartItems.reduce((a, b) => a + b.qty, 0);
  const [menu, setMenu] = useState(true);

  const handleSignout = () => {
    dispatch(SignoutUser());
    setUserInfo(null);
  };

  const SearchProduct = async (e) => {
    e.preventDefault();
    await history.push("/search");
    dispatch(searchProduct(search));
    setSearch("");
  };

  return (
    <div className="header">
  <div className="logo">
    <span>
      <Link to="/"> CELLPHONES </Link>
    </span>
  </div>

  <div className="search">
    <form onSubmit={(e) => SearchProduct(e)}>
      <input
        type="text"
        name="search"
        placeholder="Bạn cần tìm gì?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchOutlined onClick={(e) => SearchProduct(e)} />
    </form>
  </div>

  <ul className="menu-list">
    <li><Link to="/"> Trang Chủ </Link></li>
    <li><Link to="/product"> Sản Phẩm </Link></li>
    
    {userInfo ? (
      <li onClick={() => setShowAccount2(!showAccount2)}>
        <Link>
          {userInfo.name}
          <DownOutlined style={{ fontSize: "14px" }} />
        </Link>
        {showAccount2 ? (
          <div className="menu-drop">
            {userInfo.isAdmin ? <Link to="/admin">Admin</Link> : ""}
            <Link to="/myOrder">Đơn hàng</Link>
            <Link onClick={() => handleSignout()}>Đăng xuất</Link>
          </div>
        ) : ""}
      </li>
    ) : (
      <li onClick={() => setShowAccount(!showAccount)}>
        <Link>
          Tài khoản
          <DownOutlined style={{ fontSize: "14px" }} />
        </Link>
        {showAccount ? (
          <div className="menu-drop">
            <Link to="register">Đăng kí</Link>
            <Link to="login">Đăng nhập</Link>
          </div>
        ) : ""}
      </li>
    )}

    <li className="shop-cart">
      <Link to="/cart">
        <ShoppingCartOutlined style={{ fontSize: "20px" }} />
        <span className="count">{amount}</span>
      </Link>
    </li>
  </ul>
</div>

  );
}

export default Header;
