import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"; // Use useHistory for React Router v5
import "./Admin.css";
import Sidebar from './components/sidebar/Sidebar';
import Routes from './components/Routes';

function Admin(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, error } = userSignin;
  const history = useHistory();  // Using useHistory for v5

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/"); // Redirect to home if not admin
    }
  }, [userInfo, history]);

  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__content">
        <div className="layout__content-main">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Admin;
