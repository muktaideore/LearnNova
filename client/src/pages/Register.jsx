import { useState } from "react";
// import axios from "axios";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      name: "",
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
   "/auth/register",
   formData
); 

         alert(response.data.message);

         navigate("/");
      } catch (error) {
         console.log(error);

         alert(error.response.data.message);
      }
   };

   return (
      <div className="flex justify-center items-center h-screen">
         <form
            onSubmit={handleSubmit}
            className="border p-8 rounded-lg w-96 shadow-lg"
         >
            <h1 className="text-3xl font-bold mb-6 text-center">
               Register
            </h1>

            <input
               type="text"
               name="name"
               placeholder="Enter Name"
               className="border p-2 w-full mb-4"
               onChange={handleChange}
            />

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
               Register
            </button>

            <p className="mt-4 text-center">
               Already have account?{" "}
               <Link
                  to="/"
                  className="text-blue-500"
               >
                  Login
               </Link>
            </p>
         </form>
      </div>
   );
}

export default Register;