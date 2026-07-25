
// import dotenv from "dotenv";
// dotenv.config();
// import nodemailer from "nodemailer";
// console.log("Inside sendInvitationMail()");
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
// const sendInvitationMail = async (
//    receiverEmail,
//    roomName,
//    senderName,
//    inviteLink
// ) => {

//    console.log("================================");
//    console.log("EMAIL_USER:", process.env.EMAIL_USER);
//    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
//    console.log("================================");

//    const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//          user: process.env.EMAIL_USER,
//          pass: process.env.EMAIL_PASS,
//       },
//    });

//    await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: receiverEmail,
//       subject: "Learnify Invitation",
//       html: `
//       <h2>Hello</h2>
//       <p>${senderName} invited you to ${roomName}</p>
//       <a href="${inviteLink}">Accept</a>
//       `,
//    });
// };

// export default sendInvitationMail;

import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const sendInvitationMail = async (
   receiverEmail,
   roomName,
   senderName,
   inviteLink
) => {

   console.log("EMAIL_USER =", process.env.EMAIL_USER);
   console.log("EMAIL_PASS =", process.env.EMAIL_PASS);

   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS,
      },
   });

   await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: receiverEmail,
      subject: "📚 Learnify Group Study Invitation",
      html: `
      <h2>Hello 👋</h2>

      <p>
      <b>${senderName}</b> invited you to
      <b>${roomName}</b>
      </p>

      <a href="${inviteLink}">
      Accept Invitation
      </a>
      `,
   });

};

export default sendInvitationMail;