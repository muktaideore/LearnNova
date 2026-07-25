import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function VerifyEmail() {
   const navigate = useNavigate();

   const [email, setEmail] = useState("");
   const [otp, setOtp] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await API.post(
            "/auth/verify-email",
            {
               email,
               otp,
            }
         );

         alert(response.data.message);

         navigate("/login");

      } catch (error) {
         alert(
            error.response?.data?.message ||
            "Verification Failed"
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
               Verify Email
            </h1>

            <input
               type="email"
               placeholder="Enter Email"
               value={email}
               onChange={(e) =>
                  setEmail(e.target.value)
               }
               className="border p-2 w-full mb-4"
               required
            />

            <input
               type="text"
               placeholder="Enter OTP"
               value={otp}
               onChange={(e) =>
                  setOtp(e.target.value)
               }
               className="border p-2 w-full mb-4"
               required
            />

            <button
               className="bg-green-500 text-white w-full p-2 rounded"
            >
               Verify Email
            </button>
         </form>
      </div>
   );
}

export default VerifyEmail;