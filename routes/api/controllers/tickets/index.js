const express = require("express");
const router = express.Router();
const ticketController = require("./ticket.controler")
const {authenticate} = require("../../../../middlewares/auth/index")
const {authorize} = require("../../../../middlewares/auth/index")
router.post(
    "/tickets",
    authenticate,
    authorize(["client"]),
    ticketController.createTicket
);
router.delete(
    "/tickets/:id",
    authenticate,
    authorize(["client"]),
    ticketController.cancelTicket
)
module.exports = router