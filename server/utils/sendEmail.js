import { BrevoClient } from "@getbrevo/brevo";

const sendEmail = async (email, subject, message) => {
   try {

      console.log("Sending Email via Brevo to:", email);

      const brevo = new BrevoClient({
         apiKey: process.env.BREVO_API_KEY,
      });

      const response = await brevo.transactionalEmails.sendTransacEmail({
         sender: {
            name: "Learnova",
            email: "learnovadev66@gmail.com",
         },
         to: [{ email }],
         subject,
         htmlContent: message,
      });

      console.log("Email Sent Successfully:", response?.messageId);
      return true;

   } catch (error) {

      console.log("EMAIL ERROR:", error);
      return false;

   }
};

export default sendEmail;