import React from 'react';
import Header from '../components/header/Header';
import Carousel from '../components/Slider/Carousel';
import IPhone from '../components/HotSale/components/Iphone';
import Samsung from '../components/HotSale/components/Samsung';
import Xiaomi from '../components/HotSale/components/Xiaomi';
import Footer from '../components/footer/Footer';
import AppChat from '../components/AppChat/AppChat';
import ScrollToTop from '../components/ScrollToTop/ScrollToTop';
import { useSelector } from 'react-redux';

function HomePage(props) {
  const userSignin = useSelector(state => state.userSignin);
  const userInfo = userSignin?.userInfo || null;

  return (
    <div style={{position: 'relative'}}>
      <Header />
      <Carousel />
      <IPhone />
      <Samsung />
      <Xiaomi />
      <Footer />
      <ScrollToTop />
      {userInfo && userInfo.isAdmin === false ? <AppChat /> : ""}
    </div>
  );
}

export default HomePage;
