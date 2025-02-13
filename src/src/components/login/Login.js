import React, { useEffect } from 'react';
import './Login.css';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../actions/UserAction';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

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
            <h2> ĐĂNG NHẬP </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form-login">
                <input 
                    {...register("email", { required: "Email không được để trống" })} 
                    placeholder="Email" 
                    required 
                />
                {errors.email && <p className="error">{errors.email.message}</p>}
                
                <input
                    {...register("password", { required: "Mật khẩu không được để trống" })}
                    placeholder="Password"
                    type="password"
                    required
                />
                {errors.password && <p className="error">{errors.password.message}</p>}

                <input type="submit" value="Đăng Nhập" />
                {error && <h2 className="error">{error}</h2>}
                <Link to="/register">Tạo tài khoản?</Link>
            </form>
        </div>
    );
}

export default Login;
