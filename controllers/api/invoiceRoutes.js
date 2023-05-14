const router = require("express").Router();
const { Invoice } = require("../../models");
//const { sendClientPortalLogin } = require("../../utils/helpers");

/* 
URL route:    /api/invoice
*/

//get invoices by session client
router.get("/client", async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      where: { clientId: req.session.currentClient, active: true },
    });
    res.status(200).json(invoices);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// //get client by id
// router.get("/:id", async (req, res) => {
//   try {
//     const clientData = await Client.findAll({
//       where: {
//         id: req.params.id,
//       },
//     });
//     res.status(200).json(clientData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// //get all invoices
// router.get("/all", async (req, res) => {
//   try {
//     const clientsData = await Client.findAll();
//     res.status(200).json(clientsData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// Create new invoice
router.post("/", async (req, res) => {
  try {
    req.body.active = true;
    console.log(req.body);
    // create client in Db
    const newInvoice = await Invoice.create(req.body);
    console.log(newInvoice);
    // send invoice email
    res.status(200).json(newInvoice);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
