import * as brevo from "@getbrevo/brevo";

const sendEmail = async (email, subject, message) => {
   try {

      console.log("Sending Email via Brevo to:", email);

      const apiInstance = new brevo.TransactionalEmailsApi();

      apiInstance.setApiKey(
         brevo.TransactionalEmailsApiApiKeys.apiKey,
         process.env.BREVO_API_KEY
      );

      const sendSmtpEmail = new brevo.SendSmtpEmail();

      sendSmtpEmail.sender = {
         name: "Learnova",
         email: "learnovadev66@gmail.com",
      };

      sendSmtpEmail.to = [{ email }];
      sendSmtpEmail.subject = subject;
      sendSmtpEmail.htmlContent = message;

      const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

      console.log("Email Sent Successfully:", response.body?.messageId);
      return true;

   } catch (error) {

      console.log("EMAIL ERROR:", error?.response?.body || error);
      return false;

   }
};

export default sendEmail;