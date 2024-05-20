import { NextResponse } from 'next/server'
import ConnectMongoDB from '@/app/libs/mongodb'
import { getSession } from '@/app/libs/server'
import AccountModel from '@/app/models/AccountModel'
import ReservationModel from '@/app/models/ReservationModel'

export const POST = async (req) => {
    try {
        const session = await getSession()
        if (session.isLoggedIn === false) {
            return NextResponse.json(
                { message: 'Authentication failed' },
                { status: 401 }
            )
        }
        const { username } = session

        const { time_slot_id, date } = await req.json() 

        console.log({ time_slot_id, date })

        let reservation = await ReservationModel.findOne({ time_slot_id, date })
        if (!reservation) {
            reservation = await ReservationModel.create({
                time_slot_id,
                date
            })
        }

        await fetch(`http://localhost:3000/api/reservation/${ reservation._id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username
            })
        })

        await fetch(`http://localhost:3000/api/account/${ username }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                reservation_id: reservation._id,
                queue_number: reservation.patient.length + 1
            })
        })

        return NextResponse.json(
            { message: 'Reservation created' },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}