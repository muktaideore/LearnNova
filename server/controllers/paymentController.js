import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import User from "../models/User.js";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

const PLATFORM_FEE_AMOUNT = 99; // ₹99, in rupees

// ==========================================
// GET KEY
// ==========================================
export const getKey = async (req, res) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_API_KEY,
  });
};

// ==========================================
// CREATE ORDER
// ==========================================

// ==========================================
// CREATE ORDER
// ==========================================
export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: PLATFORM_FEE_AMOUNT * 100,
      currency: "INR",

      // Maximum 40 characters
      receipt: `rcpt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    await Payment.create({
      user: req.user.id,
      razorpayOrderId: order.id,
      amount: PLATFORM_FEE_AMOUNT,
      status: "created",
    });

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.log("RAZORPAY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.error?.description || "Failed to create order",
    });
  }
};

// ==========================================
// VERIFY PAYMENT
// ==========================================
// export const verifyPayment = async (req, res) => {
//   try {
    
// const {
//   razorpay_order_id,
//   razorpay_payment_id,
//   razorpay_signature,
// } = req.body || {};
//     const generatedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
//       .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//       .digest("hex");

//     if (generatedSignature !== razorpay_signature) {
//       await Payment.findOneAndUpdate(
//         { razorpayOrderId: razorpay_order_id },
//         { status: "failed" }
//       );

//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }

//     await Payment.findOneAndUpdate(
//       { razorpayOrderId: razorpay_order_id },
//       {
//         razorpayPaymentId: razorpay_payment_id,
//         razorpaySignature: razorpay_signature,
//         status: "paid",
//       }
//     );

//     await User.findByIdAndUpdate(req.user.id, { isPremium: true });

//     res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Payment verification error",
//     });
//   }
// };

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body || {};

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are missing",
      });
    }

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_API_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { status: "failed" }
      );

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "paid",
      }
    );

    await User.findByIdAndUpdate(
      req.user.id,
      { isPremium: true }
    );

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });

  } catch (error) {
    console.log("PAYMENT VERIFY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification error",
    });
  }
};

// ==========================================
// GET MY PAYMENT STATUS
// ==========================================
export const getPaymentStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      isPremium: user?.isPremium || false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};