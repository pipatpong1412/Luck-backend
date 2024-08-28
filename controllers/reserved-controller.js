const db = require('../models/db')

exports.showBooking = async (req, res, next) => {
    try {
        const rs = await db.booking.findMany({
            where: {
                user_id: req.user.id,
                // status: {
                //     in: ['RESERVED', 'CANCELED'],
                // }
            }
        })
        res.json(rs)
    } catch (error) {
        next(error)
    }
}

exports.adminShowBooking = async (req, res, next) => {
    try {
        const rs = await db.booking.findMany({})
        res.json(rs)
    } catch (error) {
        next(error)
    }
}

exports.doctorShowBooking = async (req, res, next) => {
    try {
        const rs = await db.booking.findMany({
            where: {
                status: 'APPROVED'
            }
        })
        res.json(rs)
    } catch (error) {
        next(error)
    }
}

exports.creacteBooking = async (req, res, next) => {
    const { datetime, phone, disease, user_id, notes } = req.body

    try {
        const booking = await db.booking.create({
            data: {
                datetime: new Date(datetime),
                phone,
                disease,
                user_id: Number(user_id),
                notes
            }
        })
        res.json(booking)
    } catch (error) {
        next(error)
    }
}

exports.statusReserve = async (req, res, next) => {
    const { bookingId } = req.params
    const { status, notes, seen } = req.body

    try {
        const booking = await db.booking.update({
            where: {
                id: Number(bookingId)
            },
            data: {
                status,
                notes,
                seen
            }
        })

        res.json(booking)
    } catch (error) {
        next(error)

    }
}

exports.getResevedId = async (req, res, next) => {

    const { id } = req.params
    try {

        const rs = await db.booking.findFirst({
            where: {
                id: +id
            }
        })
        res.json(rs)

    } catch (error) {
        next(error)
    }
}

exports.editRerved = async (req, res, next) => {
    const { bookingId } = req.params;
    const { phone, disease, datetime } = req.body;
    try {
        const updatedBooking = await db.booking.update({
            where: {
                id: Number(bookingId)
            },
            data: {
                phone,
                disease,
                datetime
            }
        });

        res.json(updatedBooking);
    } catch (error) {
        next(error);
    }
}

exports.creacteBooking = async (req, res, next) => {
    try {
        const input = req.body
        const datetime = new Date(input.datetime)

        const booking = await db.booking.create({

            data: {
                datetime,
                phone: input.phone,
                disease: input.disease,
                user_id: +input.user_id,
                notes: input.notes,


            }
        })
        res.json({ booking })
    } catch (error) {
        next(error);
    }




}