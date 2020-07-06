const express = require("express");
const router = express.Router();
const tripController = require("./trip.controller")
const {authenticate} = require("../../../../middlewares/auth/index")
const {authorize} = require("../../../../middlewares/auth/index")

router.get(
    "/trips",
    tripController.getTrip
    
);
router.get(
    "/trips/:id",
    tripController.getTripById
);
router.post(
    "/trips",
    authenticate,
    authorize(["admin"]),
    tripController.postTrip
);
router.patch(
    "/trips/:id",
    authenticate,
    authorize(["admin"]),
    tripController.patchTripById
);
router.delete(
    "/trips/:id",
    authenticate,
    authorize(["admin"]),
    tripController.deleteTrip
);

module.exports = router;