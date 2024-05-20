import { NextResponse } from 'next/server'
import { getSession } from '@/app/libs/server'

export const GET = async (req) => {
    const session = await getSession()
    console.log(session)

    // console.

    return NextResponse.json(
        { message: 'test' },
        { status: 200 }
    )
}