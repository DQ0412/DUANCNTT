import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {
  filterProductByPrice,
  filterProductByType,
} from "../../actions/ProductAction";
import { formatPrice } from "../../untils/index";
import FilterMenu from "./FilterMenu/FilterMenu";
import './Sale.css';
// Sample Data for Brand filter
export const allTypeProduct = [
  {
    name: "iphone",
    img: "https://cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png",
  },
  {
    name: "samsung",
    img: "https://cdn.tgdd.vn/Brand/1/Samsung42-b_25.jpg",
  },
  {
    name: "oppo",
    img: "https://cdn.tgdd.vn/Brand/1/OPPO42-b_5.jpg",
  },
  {
    name: "vivo",
    img: "https://cdn.tgdd.vn/Brand/1/Vivo42-b_50.jpg",
  },
  {
    name: "xiaomi",
    img: "https://cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png",
  },
  {
    name: "realme",
    img: "https://cdn.tgdd.vn/Brand/1/Realme42-b_37.png",
  },
  {
    name: "vsmart",
    img: "https://cdn.tgdd.vn/Brand/1/Vsmart42-b_40.png",
  },
  {
    name: "nokia",
    img: "https://cdn.tgdd.vn/Brand/1/Nokia42-b_21.jpg",
  },
];

function FilterProduct(props) {
  const dispatch = useDispatch();
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState('');

  // Filter products by price
  const FilterProductByPrice = (a, b) => {
    let startPrice = parseInt(a);
    let endPrice = parseInt(b);
    
    if (!startPrice || !endPrice || startPrice > endPrice) {
      alert("Vui lòng nhập giá hợp lệ.");
      return;
    }

    dispatch(filterProductByPrice(startPrice, endPrice));
  };

  // Filter products by brand (type)
  const FilterProductByType = (type) => {
    setSelectedBrand(type);
    dispatch(filterProductByType(type));
  };

  return (
    <div className="filter">
      <FilterMenu></FilterMenu>

      {/* Brand Filter Section */}
      <div className="brand-filter">
        <h3>Chọn Thương Hiệu</h3>
        <div className="brand-options">
          {allTypeProduct.map((brand, index) => (
            <div
              key={index}
              className="brand-option"
              onClick={() => FilterProductByType(brand.name)}
            >
              <img src={brand.img} alt={brand.name} />
              
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
}

export default FilterProduct;
