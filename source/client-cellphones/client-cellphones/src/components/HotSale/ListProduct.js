import React from 'react';
import Product from './Product';
import './Sale.css';
function ListProduct({ HotSaleProducts }) {
    return (
      <div className="hotsale-listproduct">
        {HotSaleProducts.map((product, index) => (
          <div className="hotsale-listproduct-product" key={index}>
            <img
              src={`http://127.0.0.1:8000/storage/${product.image}`}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <div className="price">
              <span className="price1">{product.sale_price}₫</span>
              <span className="price2">{product.price}₫</span>
            </div>
            {product.percentDiscount >= 5 && (
              <div className="discount">
                <p>{product.percentDiscount}%</p>
              </div>
            )}
            <button className="buy-now">Mua Ngay</button>
          </div>
        ))}
      </div>
    );
  }
  
export default ListProduct;
