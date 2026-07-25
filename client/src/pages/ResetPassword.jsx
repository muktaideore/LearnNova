import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ResetPassword() {

   const navigate = useNavigate();

   const [formData, setFormData] =
      useState({
         email: "",
         otp: "",
         password: "",
      });

   const handleChange = (e) => {

      setFormData({
         ...formData,
         [e.target.name]:
            e.target.value,
      });
   };

   const handleSubmit = async (e) => {

      e.preventDefault();

      try {

         const response = await API.post(
            "/auth/reset-password",
            formData
         );

         alert(response.data.message);

         navigate("/login");

      } catch (error) {

         alert(
            error.response?.data?.message
         );
      }
   };

   return (
      <div className="min-h-screen flex justify-center items-center">
         <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-96"
         >
            <h1 className="text-3xl font-bold mb-6 text-center">
               Reset Password
            </h1>

            <input
               type="email"
               name="email"
               placeholder="Email"
               className="border p-2 w-full mb-4"
               onChange={handleChange}
               required
            />

            <input
               type="text"
               name="otp"
               placeholder="OTP"
               className="border p-2 w-full mb-4"
               onChange={handleChange}
               required
            />

            <input
               type="password"
               name="password"
               placeholder="New Password"
               className="border p-2 w-full mb-4"
               onChange={handleChange}
               required
            />

            <button
               className="bg-black text-white w-full p-2 rounded"
            >
               Reset Password
            </button>
         </form>
      </div>
   );
}

export default ResetPassword;