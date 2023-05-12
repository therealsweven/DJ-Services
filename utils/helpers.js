const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

// CLIENT_ID = '452002313861-h27los1iisks6usk9m1ba9dt7ktqumol.apps.googleusercontent.com'
// CLIENT_SECRET = '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'
// REDIRECT_URI = 'https://developers.google.com/oauthplayground'
// REFRESH_TOKEN = '1//04LmANk1JFfsaCgYIARAAGAQSNwF-L9Irjf1aPwFe7cqvpHGoig07KPgA3HkYP1PO_0ozUrvCGVPEDXLctkibvUFLfFkoOwV7GhA'
//set up OAUTH 2.0 Client
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

//set credentials for client
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

module.exports = {
  sendMail: async (recipient) => {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "info@denverdjservices.com",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      const mailOptions = {
        from: "Denver DJ Services 🎵<info@denverdjservices.com>",
        to: recipient.email,
        subject: "Inquiry Confirmation",
        text: "Hello testing testing 12345678910",
        html: "<h1>Hello testing testing 12345678910</h1>",
      };
      const result = transporter.sendMail(mailOptions);
      return result;
    } catch (err) {
      return err;
    }
  },
};
