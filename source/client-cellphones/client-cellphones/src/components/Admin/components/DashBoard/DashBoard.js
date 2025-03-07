import React from "react";
import {
  BellOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import "./DashBoard.css";
import ChartDashBoard from "./ChartDashBoard";

export default function DashBoard() {
  return (
    <section id="dashboard">
      <div className="dashboard">
        <div className="dashboard-top">
          <div className="dashboard-top-search">
            <form>
              <input placeholder="Search ..."></input>
              <span>
                <SearchOutlined />
              </span>
            </form>
          </div>
          <div className="dashboard-top-content">
            <li className="dashboard-top-content-avatar">
              <img src="https://res.cloudinary.com/caokhahieu/image/upload/v1626334932/gediogbkwlg85kbbsamq.jpg" alt="avatar" />
              <span>ADMIN</span>
            </li>
            <li className="dashboard-top-content-bell">
              <BellOutlined />
            </li>
          </div>
        </div>

        <div className="dashboard-middle">
          <div className="dashboard-middle-statistic">
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <ShoppingOutlined />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">1666</span>
                  <span className="title">Total Sales</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <ShoppingCartOutlined />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">10</span>
                  <span className="title">Daily Visits</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <DollarCircleOutlined />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">387</span>
                  <span className="title">Total Income</span>
                </div>
              </li>
            </div>
            <div className="dashboard-middle-statistic-content">
              <li>
                <div className="dashboard-middle-statistic-icon">
                  <FileTextOutlined />
                </div>
                <div className="dashboard-middle-statistic-title">
                  <span className="total">34</span>
                  <span className="title">Total Orders</span>
                </div>
              </li>
            </div>
          </div>
          <ChartDashBoard />
        </div>
      </div>
    </section>
  );
}
