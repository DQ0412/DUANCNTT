import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFoundPage = () => {
  const location = useLocation();
  console.log("🚨 Debug location:", location); // Kiểm tra location có undefined không

  return <h1>404 - Page Not Found at {location.pathname}</h1>;
};

export default NotFoundPage;
