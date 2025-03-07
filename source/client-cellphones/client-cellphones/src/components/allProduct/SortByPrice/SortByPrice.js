import React from "react";
import "./SortByPrice.css";
import { useDispatch } from "react-redux";
import {
  ascendingProduct,
  descendingProduct,
} from "../../../actions/ProductAction";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function SortByPrice() {
  const dispatch = useDispatch();

  const handleSortAscending = () => {
    dispatch(ascendingProduct());
  };

  const handleSortDescending = () => {
    dispatch(descendingProduct());
  };

  const menuShow = (
    <Menu>
      <Menu.Item key="1" onClick={handleSortDescending}>
        <span>Thấp đến cao</span>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleSortAscending}>
        <span>Cao đến thấp</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="sort-price">
      <Dropdown overlay={menuShow} trigger={["click"]}>
        <span className="sort-price-title">
          Sắp xếp theo giá <DownOutlined />
        </span>
      </Dropdown>
    </div>
  );
}
