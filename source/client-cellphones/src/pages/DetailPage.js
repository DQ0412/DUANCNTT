import React from "react";
import Header from "../components/header/Header";
import Detail from "../components/detail/Detail";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import AppChat from "../components/AppChat/AppChat";
import { useSelector } from "react-redux";

function DetailPage(props) {
  const userSignin = useSelector(state => state.userSignin);
  const userInfo = userSignin?.userInfo || null;
      
  return (
    <div>
      <Header></Header>
      <Detail></Detail>
      {userInfo ? <AppChat></AppChat> : ""}
      <ScrollToTop></ScrollToTop>
    </div>
  );
}

export default DetailPage;
