


// import { useState, useEffect } from "react";
// import API from "../services/api";

// function PremiumPayment() {
//   const [isPremium, setIsPremium] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     checkStatus();
//   }, []);

//   const checkStatus = async () => {
//     try {
//       const res = await API.get("/payment/status");
//       setIsPremium(res.data.isPremium);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handlePayment = async () => {
//     setLoading(true);

//     try {
//       // Get Razorpay key
//       const keyRes = await API.get("/payment/getKey");

//       // Create order
//       const orderRes = await API.post("/payment/create-order");

//       // Razorpay options MUST be inside this function
//       const options = {
//         key: keyRes.data.key,
//         amount: orderRes.data.amount,
//         currency: orderRes.data.currency,
//         name: "Learnify",
//         description: "Platform Access Fee",
//         order_id: orderRes.data.orderId,

//         handler: async (response) => {
//           try {
//             const verifyRes = await API.post("/payment/verify", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             });

//             if (verifyRes.data.success) {
//               alert("Payment successful! You're now a premium member.");
//               setIsPremium(true);
//             }
//           } catch (err) {
//             console.log("Verification Error:", err);
//             alert(
//               "Payment verification failed. Contact support if amount was deducted."
//             );
//           }
//         },

//         prefill: {
//           name: "Learnify User",
//           email: "user@example.com",
//           contact: "9999999999",
//         },

//         theme: {
//           color: "#2563eb",
//         },
//       };

//       const razorpayInstance = new window.Razorpay(options);

//       razorpayInstance.on("payment.failed", function (response) {
//         console.log("Payment Failed:", response.error);
//         alert(response.error.description);
//       });

//       razorpayInstance.open();
//     } catch (err) {
//       console.log("Payment Error:", err);
//       alert("Failed to start payment. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (isPremium) {
//     return (
//       <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
//         <p className="text-green-700 font-semibold">
//           ✅ You're a Premium Member
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 text-center">
//       <h3 className="text-xl font-bold mb-2">Unlock Full Access</h3>

//       <p className="text-gray-500 mb-4">
//         One-time platform fee
//       </p>

//       <p className="text-3xl font-bold text-blue-600 mb-4">
//         ₹99
//       </p>

//       <button
//         onClick={handlePayment}
//         disabled={loading}
//         className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
//       >
//         {loading ? "Processing..." : "Pay ₹99 & Unlock"}
//       </button>
//     </div>
//   );
// }

// export default PremiumPayment;
import { useState, useEffect } from "react";
import API from "../services/api";

function PremiumPayment() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await API.get("/payment/status");
      setIsPremium(res.data.isPremium);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      // Get Razorpay key
      const keyRes = await API.get("/payment/getKey");

      // Create order
      const orderRes = await API.post("/payment/create-order");

      // Razorpay options MUST be inside this function
      const options = {
        key: keyRes.data.key,
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: "Learnify",
        description: "Platform Access Fee",
        order_id: orderRes.data.orderId,

        handler: async (response) => {
          try {
            const verifyRes = await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.success) {
              alert("Payment successful! You're now a premium member.");
              setIsPremium(true);
            }
          } catch (err) {
            console.log("Verification Error:", err);
            alert(
              "Payment verification failed. Contact support if amount was deducted."
            );
          }
        },

        prefill: {
          name: "Learnify User",
          email: "user@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      razorpayInstance.on("payment.failed", function (response) {
        console.log("Payment Failed:", response.error);
        alert(response.error.description);
      });

      razorpayInstance.open();
    } catch (err) {
      console.log("Payment Error:", err);
      alert("Failed to start payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPremium) {
    return (
      <div className="alert alert-success shadow-lg justify-center text-center">

        <span className="font-semibold">

          ✅ You're a Premium Member

        </span>

      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl p-6 text-center">

      <h3 className="text-xl font-bold mb-2 text-base-content">

        Unlock Full Access

      </h3>

      <p className="text-base-content/60 mb-4">

        One-time platform fee

      </p>

      <p className="text-3xl font-bold text-primary mb-4">

        ₹99

      </p>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="btn btn-primary px-6"
      >

        {loading ? (

          <>
            <span className="loading loading-spinner loading-sm"></span>
            Processing...
          </>

        ) : (

          "Pay ₹99 & Unlock"

        )}

      </button>

    </div>
  );
}

export default PremiumPayment;