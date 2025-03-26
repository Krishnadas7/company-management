import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompanySignup = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    phoneNumber: "",
    email: "",
    password:""
  });

  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:3000/api/companies", {
      name: formData.companyName,
      phone: formData.phoneNumber,
      email: formData.email || undefined, 
      password:formData.password
    });

    if (response.status === 201) {
      alert("Company registered successfully!");
      setFormData({ companyName: "", phoneNumber: "", email: "",password:"" }); 
      navigate('/login')
    }
  } catch (error) {
    console.error("Error:", error);
    alert(error.response?.data?.message || "Failed to register. Please try again.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center">
          Company Signup
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
           
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
           
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium">
              Email (Optional)
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-lg border dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanySignup;
