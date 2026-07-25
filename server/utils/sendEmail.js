import nodemailer from "nodemailer";

const sendEmail = async (
   email,
   subject,
   message
) => {
   try {

      console.log("=================================");
      console.log("Sending Email...");
      console.log("EMAIL_USER:", process.env.EMAIL_USER);
      console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

      const transporter =
         nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
               user: process.env.EMAIL_USER,
               pass: process.env.EMAIL_PASS,
            },
         });

      await transporter.verify();

      console.log("SMTP Connection Successful");

      // const info =
      //    await transporter.sendMail({
      //       from: process.env.EMAIL_USER,
      //       to: email,
      //       subject,
      //       html: message,
      //    });
      const info = await transporter.sendMail({
   from: `"Learnify" <${process.env.EMAIL_USER}>`,
   to: email,
   subject,
   html: message,
});

      console.log("Email Sent");
      console.log(info.response);
      console.log("Message ID:", info.messageId);
console.log("Accepted:", info.accepted);
console.log("Rejected:", info.rejected);
console.log("Response:", info.response);
      return true;

   } catch (error) {

      console.log("EMAIL ERROR:");
      console.log(error);

      return false;
   }
};

export default sendEmail;