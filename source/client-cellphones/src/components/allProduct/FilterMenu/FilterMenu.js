import React, { useEffect, useState } from "react";
import "./FilterMenu.css";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import {
  filterProductByRandomField,
} from "../../../actions/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import { getAllSelectList } from "../../../actions/SelectListAction";
import { getAllTypeProduct } from "../../../actions/ListTypeProductAction";

export default function FilterMenu() {
  const dispatch = useDispatch();
  const [dataFilter, setDataFilter] = useState({});

  const filterMenuList = useSelector(state => state.selectList?.List || []);
  const { List } = useSelector(state => state.allTypeProduct || {});

  // Gọi API khi component được mount
  useEffect(() => {
    dispatch(getAllSelectList());
    dispatch(getAllTypeProduct());
  }, [dispatch]);

  // Gọi API filter khi `dataFilter` thay đổi
  useEffect(() => {
    if (Object.keys(dataFilter).length > 0) {
      dispatch(filterProductByRandomField(dataFilter));
    }
  }, [dataFilter, dispatch]);

  // Debug dữ liệu filter
  useEffect(() => {
    console.log("📌 Bộ lọc hiện tại:", dataFilter);
  }, [dataFilter]);

  // Hiển thị từng menu lọc
  const filterMenuItemAntd = (item) => (
    <div className="filter-menu-item" key={item.property}>
      <div
        className={
          dataFilter[item.property]
            ? `filter-menu-item-name active`
            : `filter-menu-item-name`
        }
      >
        <Dropdown overlay={menuShow(item, item.options)} trigger={["click"]}>
          <span className="ant-dropdown-link">
            {dataFilter[item.property] || item.name}
            <DownOutlined />
          </span>
        </Dropdown>
      </div>
    </div>
  );

  // Hiển thị danh sách lựa chọn trong dropdown
  const menuShow = (menuItem, arrItem) => (
    <div className="menu-show">
      <div className="menu-show-list">
        {arrItem.map((item, index) => (
          <div
            key={index}
            className="menu-show-item"
            onClick={() => handleClickMenuShow(item, menuItem)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="menu-show-btn">
        <button
          className="cancel"
          onClick={() => CancelChooseMenuShow(menuItem)}
        >
          Bỏ Chọn
        </button>
      </div>
    </div>
  );

  // Xử lý khi người dùng chọn 1 tùy chọn lọc
  const handleClickMenuShow = (item, menuItem) => {
    setDataFilter(prevState => ({
      ...prevState,
      [menuItem.property]: item
    }));
  };

  // Bỏ chọn filter
  const CancelChooseMenuShow = (menuItem) => {
    setDataFilter(prevState => {
      const newState = { ...prevState };
      delete newState[menuItem.property];
      return newState;
    });
  };

  // Hiển thị danh sách loại sản phẩm
  const MenuFirmProduct = (item) => (
    <div
      key={item.name}
      className={dataFilter.type === item.name ? "filter-menu-firm-item active" : "filter-menu-firm-item"}
      onClick={() => HandleFilterProductByType(item.name)}
    >
      <img src={item.img} alt={item.name} />
    </div>
  );

  // Xử lý lọc theo loại sản phẩm
  const HandleFilterProductByType = (name) => {
    setDataFilter(prevState => {
      const newState = { ...prevState };
      if (newState.type === name) {
        delete newState.type;
      } else {
        newState.type = name;
      }
      return newState;
    });
  };

  return (
    <div>
      <div className="filter-menu-firm">
        {List && List.length > 0 ? List.map(MenuFirmProduct) : <p>Không có dữ liệu</p>}
      </div>

      <div className="filter-menu">
        {filterMenuList && filterMenuList.length > 0
          ? filterMenuList.map(filterMenuItemAntd)
          : <p>Không có bộ lọc</p>}
      </div>
    </div>
  );
}
