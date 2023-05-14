// import models
const Inquiry = require("./Inquiry");
const Client = require("./Client");
const Admin = require("./Admin");
const Invoice = require("./Invoice");

Invoice.belongsTo(Client, {
  foreignKey: "clientId",
});

module.exports = {
  Inquiry,
  Client,
  Admin,
  Invoice,
};
