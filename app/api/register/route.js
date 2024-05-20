import { NextResponse } from 'next/server'
import ConnectMongoDB from '@/app/libs/mongodb'
import { getSession } from '@/app/libs/server'
import AccountModel from '@/app/models/AccountModel'

export const POST = async (req) => {
    try {
        await ConnectMongoDB()

        const { username, name, password } = await req.json()

        const found = await AccountModel.findOne({ username })
        if (found) {
            return NextResponse.json(
                { message: `Username already used` },
                { status: 409 }
            )
        }

        await AccountModel.create({
            username,
            name,
            password
        })

        return await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error '},
            { status: 500 }
        )
    }
}

