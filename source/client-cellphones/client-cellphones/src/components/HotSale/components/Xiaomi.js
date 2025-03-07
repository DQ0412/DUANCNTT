import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListProduct from '../ListProduct';
import { handlePercentDiscount } from '../../../untils/index';
import { useDispatch } from 'react-redux';

function Xiaomi(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState('Xiaomi');
  const [hotXiaomi, setHotXiaomi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function FetchApi() {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://127.0.0.1:8000/api/products/category/${name}`);
        setHotXiaomi(data);
      } catch (err) {
        setError('Failed to load products.');
        console.error('Error fetching Xiaomi products:', err);
      } finally {
        setLoading(false);
      }
    }
    FetchApi();
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section id="hotsale-xiaomi">
      <div className="hotsale">
        <h2>{name}</h2>
        {hotXiaomi.length > 0 ? (
          <ListProduct HotSaleProducts={handlePercentDiscount(hotXiaomi)} />
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </section>
  );
}

export default Xiaomi;
