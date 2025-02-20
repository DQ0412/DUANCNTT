import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListProduct from '../ListProduct';
import { handlePercentDiscount } from '../../../untils/index';
import { useDispatch } from 'react-redux';

function Samsung(props) {
  const dispatch = useDispatch();
  const [name, setName] = useState('samsung');
  const [hotSamsung, setHotSamsung] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function FetchApi() {
      try {
        setLoading(true);
        const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${name}`);
        setHotSamsung(data);
      } catch (err) {
        setError('Failed to load products.');
        console.error('Error fetching Samsung products:', err);
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
    <section id="hotsale-samsung">
      <div className="hotsale">
        <h2>{name}</h2>
        {hotSamsung.length > 0 ? (
          <ListProduct HotSaleProducts={handlePercentDiscount(hotSamsung)} />
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </section>
  );
}

export default Samsung;
