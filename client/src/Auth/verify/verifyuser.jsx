import React, { useState } from 'react';
import "./verifyuser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";

const VerifyUser = () => {
  
  const [formData, setFormData] = useState({ email: '', otp: '' });
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post("http://localhost:6500/api/v1/user/verify-account", formData);

      
      toast.success(response.data.message || "Account verified successfully!", { position: "top-right" });
      navigate("/login");

    } catch (err) {

      const errorMsg = err.response?.data?. data?.message || "Account verification failed.";
      toast.error(errorMsg, { position: "top-right" });
      console.error("Account verification Error:", err);
    }
  };

  const resendOtp = async () => {
    try {
      
      const response = await axios.post("http://localhost:6500/api/v1/user/resend-otp", formData);
      
      toast.success(response.data.message || "Otp resent successfully!", { position: "top-right" });

    } catch (err) {

      const errorMsg = err.response?.data?. data?.message || "otp resend failed";
      toast.error(errorMsg, { position: "top-right" });
      console.error("Otp resend Error:", err);
    }
  }

  return (
    <div className="verifyUser">
      <form className="verifyUserForm" onSubmit={handleSubmit}>
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
        <h6>Didn't get the code? 
            <button 
            
            onClick={() => resendOtp()} 
            style={{ 
                background: 'none',      /* Removes the gray background */
                border: 'none',          /* Removes the button border */
                color: '#007bff',        /* Makes the text "link blue" */
                textDecoration: 'underline', /* Adds the underline */
                cursor: 'pointer',       /* Makes the mouse turn into a "hand" icon */
                padding: 0,              /* Removes default button internal spacing */
                fontSize: '16px',        /* Matches your paragraph text size */
                fontFamily: 'inherit'    /* Uses the same font as the rest of your app */
                }}
            > Resend Otp
            </button>
           
        </h6>

        <Link>
            
        </Link>

        <div className="inputGroup">
          <label htmlFor="otp">Otp:</label>
          <input
            type="otp" 
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={inputHandler}
            autoComplete="off"
            placeholder="Enter otp"
            required
          />
        </div>
   
        <div className="inputGroup">
          
          <button type="submit" className="btn btn-primary">
            Verify Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyUser;