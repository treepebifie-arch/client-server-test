import React, { useState } from 'react';
import "./loginuser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

const Login = () => {
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:6500/api/v1/user/login", formData);
      
     const {token, role } = response.data.data; 

    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem("role", role);

      toast.success(response.data.data.message || "Login Successful!", { position: "top-right" });

      const user = response.data.data.user;

      console.log("User object:", user);
      console.log("User role:", user?.role)

      if (user?.role === "admin") {
            navigate("/get-all-notes");
          } else {
            navigate("/findnote");
          };
    }

    } catch (err) {

      const errorMsg = err.response?.data?.data?.message || "Login failed. Check your credentials.";
      toast.error(errorMsg, { position: "top-right" });
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="login">

      <h2>Welcome!!!</h2>
      <h5>Please log in to your account to continue</h5>

      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password:</label>
          <input
            type="password" // Changed from 'text' to 'password' for security
            id="password"
            name="password"
            value={formData.password}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="inputGroup">
          
          <button type="submit" className="btn btn-primary">
            Continue
          </button>
        </div>
        <h6>Don't have an account? 
          <Link to= '/signup'> Sign up </Link>
        </h6>
      </form>
    </div>
  );
};

export default Login;