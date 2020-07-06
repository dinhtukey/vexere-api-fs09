const { Station } = require("../../../../models/Station");
const _ = require("lodash");
const getStation = (req, res, next) => {
    Station.find()
        .then(stations => {
            res.status(200).json(stations)
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

const postStation = (req, res, next) => {
    // const name= req.body.name;
    // const address = req.body.address;
    // const province = req.body.province;

    const { name, address, province } = req.body;
    const newStation = new Station({ name, address, province })
    newStation.save()
        .then(station => {
            res.status(201).json(station);
        })
        .catch(err => res.status(500).json(err))
}

const getStationById = (req, res, next) => {
    const { id } = req.params;
    Station.findById(id)
        .then(station => res.status(200).json(station))
        .catch(err => res.status(500).json(err))
}

//replace
const putStationById = (req, res, next) => {
    const { id } = req.params;
    Station.findById(id)
        .then(station => {
            if (!station) return Promise.reject({
                status: 404,
                message: "Station not found"
            })
            // const {name,address,province} = req.body;
            // station.name = name;
            // station.address = address;
            // station.province = province;
            const keys = ["name", "address", "province"]
            keys.forEach(key => {
                station[key] = req.body[key]
            })
            return station.save()
            //Object.keys(station).foreach(key => station_instance[key]=station[key])

            return station.save()
        })
        .then(station => res.status(200).json(station))
        .catch(err => res.status(500).json(err))
}

const patchStationById = (req, res, next) => {
    const { id } = req.params;
    Station.findById(id)
        .then(station => {
            if (!station) return Promise.reject({
                status: 404,
                message: "Station not found"
            })
            //const {name,address,province} = req.body;
            // station.name = name ? name : station.name;
            // station.address = address ? address : station.address;
            // station.province = province ? province : station.province;
            Object.keys(req.body).forEach(key => {
                station[key] = req.body[key]
            })
            return station.save()


            //return station.save()
        })
        .then(station => res.status(200).json(station))
        .catch(err => res.status(500).json(err))
}

const deleteStationById = (req, res, next) => {
    const { id } = req.params;
    Station.findById(id)
        .then(station => {
            if (!station) return Promise.reject({
                status: 404,
                message: "Station not found"
            })
            return Promise.all([
                Station.deleteOne({ _id: id }),
                station
            ])
        })
        .then(result => res.status(200).json(result[1]))
        .catch(err => res.status(500).json(err))
}
module.exports = {
    getStation,
    postStation,
    getStationById,
    putStationById,
    deleteStationById,
    patchStationById
}