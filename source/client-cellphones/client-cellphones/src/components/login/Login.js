import React, { useEffect } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/UserAction";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { userInfo, error } = useSelector((state) => state.userSignin) || {};

  const onSubmit = async (data) => {
    await dispatch(login(data));
  };

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [userInfo, history]);

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">ĐĂNG NHẬP</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form-login">
          <div className="input-group">
            <input
              {...register("email", { required: "Vui lòng nhập email" })}
              placeholder="Email"
              type="email"
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <input
              {...register("password", { required: "Vui lòng nhập mật khẩu" })}
              placeholder="Mật khẩu"
              type="password"
            />
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="login-button">Đăng Nhập</button>
          <p className="signup-link">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
