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
  sendConfirmation: async (info) => {
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
        to: info.email,
        subject: "Inquiry Confirmation",
        text: `Hello ${info.name},
        Thank you for inquiring about our DJ Services.  We will get back to you in 48 hours or less via your preferred method of communication.  If you have any immediate questions, please feel free to call our business telephone at (303)-815-7012.  We look forward to working with you.  Have a magical day!        
        Best wishes,
        DenverDJ Services`,
        html: `<p>Hello <b>${info.name}</b>,</br>
        <p>Thank you for inquiring about our DJ Services.  We will get back to you in 48 hours or less via your preferred method of communication.  If you have any immediate questions, please feel free to call our business telephone at <a type="tel" href="3038157012">(303)-815-7012</a>.  We look forward to working with you.  Have a magical day!</p>
        </br></br>
        <p>Best wishes,</p></br>
        <p>Denver DJ Services🎵</p>`,
      };
      const result = transporter.sendMail(mailOptions);
      return result;
    } catch (err) {
      return err;
    }
  },
  sendInfoToMe: async (info) => {
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
        to: "<bobby@denverdjservices.com>",
        subject: "New DJ Inquiry",
        text: `Name: ${info.name}
        Email: ${info.email}
        Phone: ${info.phone}
        Date: ${info.date}
        Comm: ${info.commMethod}
        Info: ${info.message}
        `,
        html: `<h2>New Inquiry Info: </h2>
        <p>Name: ${info.name}</p>
        <p>Email: ${info.email}</p>
        <p>Phone: ${info.phone}</p>
        <p>Date: ${info.date}</p>
        <p>Comm: ${info.commMethod}</p>
        <p>Message: ${info.message}</p>`,
      };
      const result = transporter.sendMail(mailOptions);
      return result;
    } catch (err) {
      return err;
    }
  },
};
