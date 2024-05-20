'use client'

import { useState } from 'react'
import styles from './style.css'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        
        if (!response.ok)
        {
            console.log('hmm')
            return
        }

        window.location.href = '/'
    }

    return (
        <>
        <div className='container card-white'>
            <form onSubmit={ handleSubmit }>
                <input
                    className='form'
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={ formData.username }
                    onChange={ handleChange }
                />
                <input
                    className='form'
                    type='text'
                    name='name'
                    placeholder='Full Name'
                    value={ formData.name }
                    onChange={ handleChange }
                />
                <input
                    className='form'
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={ formData.password }
                    onChange={ handleChange }
                />
                <input
                    className='form'
                    type='submit'
                    value='Register'
                />
                <h3>Already have an account?</h3>
                <h3><a href='/login'><b>Login</b></a></h3>
            </form>
        </div>
        </>
    );
}

export default Register
