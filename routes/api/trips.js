const {Trip} = require("../../models/Trip")
const {Seat} = require("../../models/Seat")

const seatCodes = [
    'A01','A02','A03','A04','A05','A06','A07','A08','A09','A10','A11','A12',
    'B01','B02','B03','B04','B05','B06','B07','B08','B09','B10','B11','B12'
]
const postTrip = (req,res,next) => {
    const {fromStation,toStation,startTime,price} = req.body;
    const seats = [];
    seatCodes.forEach(code=>{
        const newSeat = new Seat({code})
        seats.push(newSeat)
    })

    const newTrip = new Trip({fromStation,toStation,startTime,price,seats});
    newTrip.save()
    .then(trip=>res.status(201).json(trip))
    .catch(err=>res.status(500).json(err));
}

const getTrip = (req,res,next) => {
    Trip.find()
    .then(trip=>{
        res.status(200).json(trip)
    })
    .catch(err=>res.status(500).json(err))
}

const getTripById = (req,res,next) => {
    const {id} = req.params;
    Trip.findById(id)
    .then(trip=>res.status(200).json(trip))
    .catch(err=>res.status(500).json(err))
}

const putTripById = (req,res,next) => {
    const {id} = req.params;
    Trip.findById(id)
    .then(trip=>{
        if(!trip){
            return Promise.reject({
                status:404,
                message: "trip not found"
            })
        }
        const {fromStation,toStation,startTime,price} = req.body;
        trip.fromStation = fromStation;
        trip.toStation = toStation;
        trip.startTime = startTime;
        trip.price = price;
        return trip.save()
    })
    .then(trip=>res.status(200).json(trip))
    .catch(err=>res.status(500).json(err))
}

const deleteTrip = (req,res,next) => {
    const {id} = req.params;
    Trip.findById(id)
    .then(trip=>{
        if(!trip){
            return Promise.reject({
                status: 404,
                message: "trip not found"
            })
        }
        return trip.deleteOne({_id:id})
    })
    .then(()=>res.status(200).json("1"))
    .catch(err=>res.status(500).json(err))
}
module.exports = {
    postTrip,getTrip,getTripById,putTripById,deleteTrip
}