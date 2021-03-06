const {Trip} = require("../../../../models/Trip")
const {Seat} = require("../../../../models/Seat")
const _ = require("lodash");

const seatCodes = [
    'A01','A02','A03','A04','A05','A06','A07','A08','A09','A10','A11','A12',
    'B01','B02','B03','B04','B05','B06','B07','B08','B09','B10','B11','B12'
]
const postTrip = (req,res,next) => {
    const {fromStation,toStation,startTime,price} = req.body;
    // const seats = [];
    // seatCodes.forEach(code=>{
    //     const newSeat = new Seat({code})
    //     seats.push(newSeat)
    // })
    const seats = seatCodes.map(code=>{
        return new Seat({code})
    })
    const newTrip = new Trip({fromStation,toStation,startTime,price,seats});
    newTrip.save()
    .then(trip=>res.status(201).json(trip))
    .catch(err=>res.status(500).json(err));
}

const getTrip = (req,res,next) => {
    //hiển thị thêm availableSeatNumber
    Trip.find()
    //.select("-seats")
    .then(trips=>{
        const _trips = trips.map(trip=>{
            // const modifiedTrip = {
            //     ...trip._doc,
            //     availableSeatNumber: trip.seats.filter(seat=>!seat.isBooked).length
            // }
            // delete modifiedTrip.seats;
            // return modifiedTrip;

            // return {
            //     ..._.omit(trip._doc,["seats"]),
            //     availableSeatNumber: trip.seats.filter(seat=>!seat.isBooked).length
            // }
            
            // return _.assign(
            //     _.omit(trip._doc,["seats"]),
            //     {availableSeatNumber: trip.seats.filter(seat=>!seat.isBooked).length}
            // )

            return _.chain(trip)
            .get("_doc")
            .omit(["seats"])
            .assign({availableSeatNumber: trip.seats.filter(seat=>!seat.isBooked).length})
            .value()
        })
        
        res.status(200).json(_trips)
    })
    .catch(err=>res.status(500).json(err))
}

const getTripById = (req,res,next) => {
    const {id} = req.params;
    Trip.findById(id)
    .select("-seats")
    .then(trip=>{
        if(!trip){
            return Promise.reject({
                status:404,
                message:"trip not found"
            })
        }
        // const _trip = _.chain(trip)
        //     .get("_doc")
        //     .omit(["seats"])
        //     .assign({availableSeatNumber: trip.seats.filter(seat=>!seat.isBooked).length})
        //     .value()
        
        res.status(200).json(trip)
    })
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

const patchTripById = (req,res,next)=> {
    const {id} = req.params;
    Trip.findById(id)
    .then(trip=>{
        if(!trip){
            return Promise.reject({
                status:404,
                message: "trip not found"
            })
        }
        Object.keys(req.body).forEach(key=>{
            trip[key] = req.body[key]
        })
        return trip.save()
    })
    .then(trip=>res.status(200).json(trip))
    .catch(err=>res.status(500).json(err))
}
const deleteTrip = (req,res,next) => {
    const {id} = req.params;
    let _trip;
    Trip.findById(id)
    .then(trip=>{
        _trip=trip
        if(!trip){
            return Promise.reject({
                status: 404,
                message: "trip not found"
            })
        }
        trip.deleteOne({_id:id})
    })
    .then(()=>res.status(200).json(_trip))
    .catch(err=>res.status(500).json(err))
}
module.exports = {
    postTrip,getTrip,getTripById,putTripById,deleteTrip,patchTripById
}