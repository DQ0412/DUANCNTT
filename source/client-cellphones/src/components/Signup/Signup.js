import React, { useState } from "react";
import "./Signup.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SignupUser } from "../../actions/UserAction";
import { useHistory } from "react-router";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false); // Trạng thái loading

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const signupError = useSelector((state) => state.userSignup?.error || null);

  const onSubmit = async (data) => {
    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }

    setLoading(true); // Bắt đầu loading

    try {
      await dispatch(SignupUser(data));
      history.push("/login"); // Điều hướng đến login sau khi đăng ký thành công
    } catch (error) {
      console.error(error);
      setLoading(false); // Dừng loading khi có lỗi
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">ĐĂNG KÝ</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form-signup">
          <div className="input-group">
            <input
              {...register("name", { required: "Vui lòng nhập tên" })}
              placeholder="Tên của bạn"
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>

          <div className="input-group">
            <input
              {...register("email", {
                required: "Vui lòng nhập email",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Email không hợp lệ",
                },
              })}
              placeholder="Email"
              type="email"
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <input
              {...register("password", {
                required: "Vui lòng nhập mật khẩu",
                minLength: {
                  value: 8,
                  message: "Mật khẩu phải có ít nhất 8 ký tự",
                },
              })}
              placeholder="Mật khẩu"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>

          <div className="input-group">
            <input
              {...register("password_confirmation", {
                required: "Vui lòng nhập lại mật khẩu",
              })}
              placeholder="Xác nhận mật khẩu"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.password_confirmation && (
              <p className="error-text">{errors.password_confirmation.message}</p>
            )}
          </div>

          {/* Hiển thị thông báo lỗi nếu có */}
          {signupError && <p className="error-text">{signupError}</p>}

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
