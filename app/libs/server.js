'use server'

import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

const sessionOptions = {
    cookieName: 'auth',
    password: process.env.COOKIE_PASSWORD,
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production'
    }
}

const defaultSession = {
    isLoggedIn: false
}

export const getSession = async () => {
    const session = await getIronSession(cookies(), sessionOptions)
    if (!session.isLoggedIn)
    {
        session.isLoggedIn = defaultSession.isLoggedIn
    }

    return session
}