import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListProduct from '../ListProduct';
import { handlePercentDiscount } from '../../../untils/index';
import { useDispatch } from 'react-redux';

function Iphone(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState('iphone');
  const [hotIphone, setHotIphone] = useState([]);

  useEffect(() => {
    async function FetchApi() {
      try {
        const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${name}`);
        console.log('API Data:', data); // Log to check the response
        setHotIphone(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    FetchApi();
  }, [name]);

  return (
    <section id="hotsale-iphone">
      <div className="hotsale">
        <h2>{name}</h2>
        {hotIphone && hotIphone.length > 0 ? (
          <ListProduct HotSaleProducts={handlePercentDiscount(hotIphone)} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
}

export default Iphone;
