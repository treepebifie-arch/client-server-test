import React, { useState } from 'react';
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

const Signup = () => {
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:6500/api/v1/user/signup", formData);
      
      toast.success(response.data.message || "Account created successfully!", { position: "top-right" });
      navigate("/verify");
    } catch (err) {

      const errorMsg = err.response?.data?. data?.message || "Account creation failed.";
      toast.error(errorMsg, { position: "top-right" });
      console.error("Signup Error:", err);
    }
  };

  return (
    <div className="signup">


      <form className="signupForm" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            id="name"
            name="name"
            value={formData.name}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter your fullname"
            required
          />
        </div>
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
        <h6>Already have an account? 
          <p>
            <Link to='/login'>
              Login
          </Link>
          </p>
          
        </h6>
        <div className="inputGroup">
          
          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;