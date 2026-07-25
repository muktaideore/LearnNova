import { useState } from "react";
// import axios from "axios";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await API.post(
   "/auth/login",
   formData
);
localStorage.setItem("token", response.data.token);

localStorage.setItem(
   "user",
   JSON.stringify(response.data.user)
);

         alert(response.data.message);

         navigate("/dashboard");
      } catch (error) {

   console.log("FULL ERROR:", error);

   console.log(
      "SERVER RESPONSE:",
      error.response?.data
   );

   alert(
      error.response?.data?.message ||
      "Login Failed"
   );

}

   };

   return (
      <div className="flex justify-center items-center h-screen">
         <form
            onSubmit={handleSubmit}
            className="border p-8 rounded-lg w-96 shadow-lg"
         >
            <h1 className="text-3xl font-bold mb-6 text-center">
               Login
            </h1>

            <input
               type="email"
               name="email"
               placeholder="Enter Email"
               className="border p-2 w-full mb-4"
               onChange={handleChange}
            />

            <input
               type="password"
               name="password"
               placeholder="Enter Password"
               className="border p-2 w-full mb-4"
               onChange={handleChange}
            />

            <button className="bg-black text-white w-full p-2 rounded">
               Login
            </button>

            <p className="mt-4 text-center">
               Don't have account?{" "}
               <Link
                  to="/register"
                  className="text-blue-500"
               >
                  Register
               </Link>
            </p>
            <p className="mt-4 text-center">
   <Link
      to="/forgot-password"
      className="text-blue-500"
   >
      Forgot Password?
   </Link>
</p>
         </form>
      </div>
   );
}

export default Login;



