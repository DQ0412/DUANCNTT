import React, { useEffect, useState } from 'react';
import './Order.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'; // Import useHistory for React Router v5
import { GetAllDistrict, GetAllProvince, GetAllWard, OrderInfo } from "../../actions/OrderAction";
import Payment from "./Payment";
import { message } from "antd";

function Order(props) {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const history = useHistory(); // Use useHistory for React Router v5
  const allProvince = useSelector((state) => state.address?.province || []);
  const allDistrict = useSelector((state) => state.address?.district || []);
  const allWard = useSelector((state) => state.address?.ward || []);

  const [loading, setLoading] = useState(false);
  const [showProvinceList, setShowProvinceList] = useState(false);
  const [showDistrictList, setShowDistrictList] = useState(false);
  const [showWardList, setShowWardList] = useState(false);

  const [chooseProvince, setChooseProvince] = useState({ name: "Chọn tỉnh/thành phố", id: 0 });
  const [chooseDistrict, setChooseDistrict] = useState({ name: "Chọn quận/huyện", id: 0 });
  const [chooseWard, setChooseWard] = useState({ name: "Chọn phường/xã", id: 0 });
  const [customAddress, setCustomAddress] = useState('');

  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("🛒 Cart Items từ Redux:", cartItems);
  const userInfo = useSelector((state) => state.userSignin.userInfo);

  const updateAddress = (province, district, ward, customAddress) => {
    dispatch({
      type: "UPDATE_USER_ADDRESS",
      payload: { province, district, ward, customAddress },
    });
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    const qty = item.qty;
    if (isNaN(price) || isNaN(qty)) {
      console.log("Invalid price or quantity:", item);
      return total;
    }
    return total + (price * qty);
  }, 0);

  useEffect(() => {
    dispatch(GetAllProvince());
  }, [dispatch]);

  useEffect(() => {
    if (chooseProvince.id) {
      dispatch(GetAllDistrict(chooseProvince.id));
    }
  }, [chooseProvince, dispatch]);

  useEffect(() => {
    if (chooseDistrict.id) {
      dispatch(GetAllWard(chooseDistrict.id));
    }
  }, [chooseDistrict, dispatch]);

  const handleSelectProvince = (name, id) => {
    setChooseProvince({ name, id });
    setChooseDistrict({ name: "Chọn quận/huyện", id: 0 });
    setChooseWard({ name: "Chọn phường/xã", id: 0 });
    setShowProvinceList(false);
    updateAddress(name, chooseDistrict.name, chooseWard.name, customAddress);
  };

  const handleSelectDistrict = (name, id) => {
    setChooseDistrict({ name, id });
    setChooseWard({ name: "Chọn phường/xã", id: 0 });
    setShowDistrictList(false);
    updateAddress(chooseProvince.name, name, chooseWard.name, customAddress);
  };

  const handleSelectWard = (name, id) => {
    setChooseWard({ name, id });
    setShowWardList(false);
    updateAddress(chooseProvince.name, chooseDistrict.name, name, customAddress);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    if (isNaN(totalPrice) || totalPrice <= 0) {
      message.error("Tổng giá trị đơn hàng không hợp lệ!");
      setLoading(false);
      return;
    }

    if (!chooseProvince.id || !chooseDistrict.id || !chooseWard.id || !customAddress || !data.name || !data.phone) {
      message.error("Vui lòng nhập đầy đủ thông tin!");
      setLoading(false);
      return;
    }

    const order = {
      ward: chooseWard.name,
      to_district_id: chooseDistrict.id,
      orderItems: cartItems.map(item => ({
        id: item.product_id,
        qty: item.qty,
        salePrice: item.salePrice ? parseFloat(item.salePrice) : parseFloat(item.price),
        price: item.salePrice || item.price,
      })),
      province: chooseProvince.name,
      district: chooseDistrict.name,
      customAddress,
      totalPrice,
      user: userInfo,
      name: data.name,
      phone: data.phone,
      payment_method: "payOnline",
      payment_status: "pending",
    };

    console.log("📦 Order Data gửi lên API:", order);

    try {
      const token = userInfo?.token || localStorage.getItem('token');
      if (!token) {
        message.error("Không tìm thấy token! Vui lòng đăng nhập lại.");
        setLoading(false);
        history.push("/login"); // Use history.push() for React Router v5
        return;
      }

      const response = await dispatch(OrderInfo(order, token));

      console.log("Response from API:", response);

      if (response?.message === "Order created successfully") {
        message.success("Đặt hàng thành công! 🎉");
        setTimeout(() => {
          history.push("/order-success"); // Use history.push() for React Router v5
        }, 1500);
      } else {
        message.error(response?.message || "Lỗi khi xử lý đơn hàng");
        setLoading(false);
      }
    } catch (error) {
      console.error("API call error:", error);
      message.error(`Lỗi khi đặt hàng. ${error.message}`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="order">
      <div className="order-content">
        <form className="order-page" onSubmit={handleSubmit(onSubmit)}>
          <div className="customer">
            <h4>THÔNG TIN KHÁCH HÀNG</h4>
            <div className="form-customer">
              <input placeholder="Họ và tên" {...register("name")} required />
              <input placeholder="Số điện thoại" {...register("phone")} required />
            </div>
          </div>

          <div className="address">
            <h4>CHỌN ĐỊA CHỈ</h4>
            <div className="address-form">
              <div className="dropdown">
                <button type="button" onClick={() => setShowProvinceList(!showProvinceList)}>
                  {chooseProvince.name} ▼
                </button>
                {showProvinceList && (
                  <div className="dropdown-list">
                    {allProvince.map((item) => (
                      <span key={item.ProvinceID} onClick={() => handleSelectProvince(item.ProvinceName, item.ProvinceID)}>
                        {item.ProvinceName}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="dropdown">
                <button type="button" onClick={() => setShowDistrictList(!showDistrictList)} disabled={!chooseProvince.id}>
                  {chooseDistrict.name} ▼
                </button>
                {showDistrictList && (
                  <div className="dropdown-list">
                    {allDistrict.map((item) => (
                      <span key={item.DistrictID} onClick={() => handleSelectDistrict(item.DistrictName, item.DistrictID)}>
                        {item.DistrictName}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="dropdown">
                <button type="button" onClick={() => setShowWardList(!showWardList)} disabled={!chooseDistrict.id}>
                  {chooseWard.name} ▼
                </button>
                {showWardList && (
                  <div className="dropdown-list">
                    {allWard.map((item) => (
                      <span key={item.WardCode} onClick={() => handleSelectWard(item.WardName, item.WardCode)}>
                        {item.WardName}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <input placeholder="Số nhà, đường ..." value={customAddress} onChange={(e) => setCustomAddress(e.target.value)} required />
            </div>
          </div>

          <div className="payment-section">
            <Payment />
          </div>

        </form>
      </div>
    </section>
  );
}

export default Order;
