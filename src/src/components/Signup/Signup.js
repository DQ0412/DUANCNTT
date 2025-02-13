import React, { useState } from 'react';
import './Signup.css';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { SignupUser } from '../../actions/UserAction';
import { useHistory } from 'react-router';

function Signup() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); // Trạng thái loading

    const { register, handleSubmit, formState: { errors } } = useForm();
    const signupError = useSelector(state => state.userSignup?.error || null);

    const onSubmit = async (data) => {
        if(password !== confirmPassword) {
            alert("Mật khẩu không khớp");
            return;
        }

        setLoading(true); // Bắt đầu loading

        try {
            await dispatch(SignupUser(data));
            history.push('/login');  // Điều hướng đến login sau khi đăng ký thành công
        } catch (error) {
            console.error(error);
            setLoading(false); // Dừng loading khi có lỗi
        }
    };

    return (
        <div className="signup-page">
            <h2>ĐĂNG KÝ</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form-signup">
                <div>
                    <input
                        {...register("name", { required: "Name is required" })}
                        placeholder="Name"
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                </div>

                <div>
                    <input
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                message: "Invalid email address"
                            }
                        })}
                        placeholder="Email"
                        type="email"
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <input
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters"
                            }
                        })}
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div>
                    <input
                        {...register("password_confirmation", { required: "Please confirm password" })}
                        placeholder="Confirm Password"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}
                </div>

                {/* Hiển thị thông báo lỗi nếu có */}
                {signupError && <p style={{ color: 'red' }}>{signupError}</p>}

                <button type="submit" disabled={loading}>Đăng Ký</button>
                {loading && <p>Đang xử lý...</p>}
            </form>
        </div>
    );
}

export default Signup;
