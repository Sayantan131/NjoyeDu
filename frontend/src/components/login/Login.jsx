import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    loginFailure,
    loginStart,
    loginSuccess,
} from "../../features/authSlice";
import {
    getUserFailure,
    getUserStart,
    userSuccess,
} from "../../features/userSlice";
import { setAuth } from "../../persist/authPersist.js";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputType, setInputType] = useState("password");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = user;
      dispatch(loginStart());
      dispatch(getUserStart());

      const res = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      const userData = res.data;

      dispatch(
        loginSuccess({
          isAuthenticated: true,
          loading: false,
        })
      );

      dispatch(userSuccess(userData.data.user));
      dispatch(
        setAuth((userData.data.accessToken, userData.data.refreshToken))
      );
      setUser({
        email: "",
        password: "",
      });
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/");
      });
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("User doesnot exists");
        setTimeout(() => {
          navigate("/register");
        }, 1000);
      } else if (error.response.status === 401) {
        toast.error("Invalid Credentials");
      } else if (error.response.status === 400) {
        toast.error("Username or email is required");
      } else {
        toast.error(error.message);
      }
      setTimeout(() => {
        navigate("/register");
      }, 1000);
      dispatch(loginFailure(error.message));
      dispatch(getUserFailure(error.message));
    }
  };

  const togglePasswordVisiblity = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  return (
    <div className="loginwrapper">
      <div className="login">
        <h2>Login Now</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Email: </label>
            <div className="input_username">
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="off"
                required
                value={user.email}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <div className="input_password">
              <input
                type={inputType}
                id="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                value={user.password}
                onChange={handleChange}
                required
              />
              {inputType === "password" ? (
                <FaEyeSlash
                  onClick={togglePasswordVisiblity}
                  className="eye_btn"
                />
              ) : (
                <FaRegEye
                  onClick={togglePasswordVisiblity}
                  className="eye_btn"
                />
              )}
            </div>
          </div>
          <div className="form-group">
            <button type="submit">Login</button>
            <h3>New User?</h3>
            <Link to={"/register"}>Register Now</Link>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
