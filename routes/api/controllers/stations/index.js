const express = require("express");
const router = express.Router();
const stationController = require("./station.controller")
const {authenticate} = require("../../../../middlewares/auth/index")
const {authorize} = require("../../../../middlewares/auth/index")
const {validatePostStation} = require("../../../../middlewares/validation/stations/postStation")

// /api + /station => /api/stations
router.get("/stations",stationController.getStation);
router.get("/stations/:id",stationController.getStationById);
router.post(
    "/stations",
    authenticate,
    authorize(["admin"]),
    validatePostStation,
    stationController.postStation
);
router.put(
    "/stations/:id",
    authenticate,
    authorize(["admin"]),
    stationController.putStationById
);
router.patch(
    "/stations/:id",
    authenticate,
    authorize(["admin"]),
    stationController.patchStationById
);
router.delete(
    "/stations/:id",
    authenticate,
    authorize(["admin"]),
    stationController.deleteStationById
);

module.exports = router;