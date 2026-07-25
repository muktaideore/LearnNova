// import { useState } from "react";
// import API from "../services/api";
// import { useNavigate } from "react-router-dom";

// function ForgotPassword() {

//    const navigate = useNavigate();

//    const [email, setEmail] = useState("");

//    const handleSubmit = async (e) => {

//       e.preventDefault();

//       try {

//          const response = await API.post(
//             "/auth/forgot-password",
//             { email }
//          );

//          alert(response.data.message);

//          navigate("/reset-password");

//       } catch (error) {

//          alert(
//             error.response?.data?.message
//          );
//       }
//    };

//    return (
//       <div className="min-h-screen flex justify-center items-center">
//          <form
//             onSubmit={handleSubmit}
//             className="bg-white p-8 rounded-lg shadow-lg w-96"
//          >
//             <h1 className="text-3xl font-bold mb-6 text-center">
//                Forgot Password
//             </h1>

//             <input
//                type="email"
//                placeholder="Enter Email"
//                value={email}
//                onChange={(e) =>
//                   setEmail(e.target.value)
//                }
//                className="border p-2 w-full mb-4"
//                required
//             />

//             <button
//                className="bg-blue-500 text-white w-full p-2 rounded"
//             >
//                Send OTP
//             </button>
//          </form>
//       </div>
//    );
// }

// export default ForgotPassword;

import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
   const navigate = useNavigate();

   const [email, setEmail] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await API.post(
            "/auth/forgot-password",
            { email }
         );

         alert(response.data.message);

         navigate("/reset-password");

      } catch (error) {
         alert(
            error.response?.data?.message ||
            "Something went wrong"
         );
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">

         <div className="card w-full max-w-md bg-base-100 shadow-2xl">

            <div className="card-body">

               {/* Logo / Brand */}
               <div className="text-center mb-4">

                  <div className="text-5xl mb-3">
                     🔐
                  </div>

                  <h1 className="text-3xl font-bold text-primary">
                     Forgot Password?
                  </h1>

                  <p className="text-base-content/60 mt-2">
                     Enter your email to receive an OTP
                  </p>

               </div>


               {/* Form */}
               <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
               >

                  <div className="form-control">

                     <label className="label">

                        <span className="label-text">
                           Email Address
                        </span>

                     </label>

                     <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                           setEmail(e.target.value)
                        }
                        className="input input-bordered w-full focus:input-primary"
                        required
                     />

                  </div>


                  <button
                     type="submit"
                     className="btn btn-primary w-full"
                  >
                     📩 Send OTP
                  </button>

               </form>


               {/* Back to Login */}
               <div className="text-center mt-6">

                  <button
                     type="button"
                     onClick={() => navigate("/")}
                     className="btn btn-ghost btn-sm"
                  >
                     ← Back to Login
                  </button>

               </div>

            </div>

         </div>

      </div>
   );
}

export default ForgotPassword;