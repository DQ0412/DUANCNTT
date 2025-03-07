import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <section id="footer">
      <div className="footer">
        {/* Khu vực top: Chia thành 4 cột */}
        <div className="footer-top">
          {/* Cột 1 */}
          <div className="footer-col">
            <h4>Tổng đài tư vấn miễn phí</h4>
            <ul>
              <li>
                Gọi mua hàng: <strong>1800.2097</strong> (7h30 - 22h)
              </li>
              <li>
                Gọi khiếu nại: <strong>1800.2063</strong> (8h00 - 21h30)
              </li>
              <li>
                Gọi bảo hành: <strong>1800.2064</strong> (8h00 - 21h00)
              </li>
            </ul>

            <h5>Phương thức thanh toán</h5>
            <div className="payment-methods">
              {/* Thay đường dẫn icon phù hợp */}
              <img
                src="https://cdn2.cellphones.com.vn/x35,webp/media/logo/payment/vnpay-logo.png"
                alt="VNPay"
              />
              <img
                src="https://cdn2.cellphones.com.vn/x/media/wysiwyg/momo_1.png"
                alt="Momo"
              />
              
              {/* Thêm icon thanh toán khác nếu cần */}
            </div>
          </div>

          {/* Cột 2 */}
          <div className="footer-col">
            <h4>Thông tin và chính sách</h4>
            <ul>
              <li>
                <a href="#!">Mua hàng trả góp Online</a>
              </li>
              <li>
                <a href="#!">Mua hàng thanh toán online</a>
              </li>
              <li>
                <a href="#!">Chính sách bảo hành</a>
              </li>
              <li>
                <a href="#!">Chính sách vận chuyển</a>
              </li>
              <li>
                <a href="#!">Chính sách đổi trả</a>
              </li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div className="footer-col">
            <h4>Dịch vụ và thông tin khác</h4>
            <ul>
              <li>
                <a href="#!">Tra cứu thông tin đơn hàng</a>
              </li>
              <li>
                <a href="#!">Hướng dẫn mua hàng</a>
              </li>
              <li>
                <a href="#!">Trung tâm bảo hành</a>
              </li>
              <li>
                <a href="#!">Câu hỏi thường gặp</a>
              </li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div className="footer-col">
            <h4>Kết nối với CellphoneS</h4>
            <div className="app-links">
              
            </div>
            <ul>
              
              <li>
                <a href="#!">Cellphones</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Khu vực bottom */}
        <div className="footer-bot">
          <p>© 2025 Cellphones. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
}
