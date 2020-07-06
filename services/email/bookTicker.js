const nodemailer = require("nodemailer")
const fs = require("fs")
const hogan = require("hogan.js")
const template = fs.readFileSync("services/email/bookingTicketEmailTemplate.hjs","utf-8");
const compliedTemplate = hogan.compile(template);

module.exports.sendBookTicketEmail = (ticket,trip,user) => {
    const transport = {
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        requireSSL: true,
        auth: {
            user: "devdinhtu99@gmail.com",
            pass: "DinhTu123456789"
        }
    }

    const transporter = nodemailer.createTransport(transport);

    const mailOptions = {
        from: "devdinhtu99@gmail.com",
        to: user.email,
        subject: "Mail xác nhận mua vé thành công",
        html: compliedTemplate.render({
            email: user.email,
            fromStation: trip.fromStation.name,
            toStation: trip.toStation.name,
            price: trip.price,
            amount: ticket.seats.length,
            total: ticket.totalPrice * ticket.seats.length,
            seatCodes: ticket.seats
            .map(m=>m.code)
            .join(", ")
        })
    }
    transporter.sendMail(mailOptions,err=>{
        if(err) return console.log(err)
        console.log("Send email successfully")
    })
}