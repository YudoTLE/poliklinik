'use client'

import { useState } from 'react'

const Form = ({ timeSlot }) => {
    const [formData, setFormData] = useState({
        date: '',
        time_slot_id: ''
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

        if (formData.date == '') {
            return
        }
        if (formData.time_slot_id=='') {
            return
        }

        const response = await fetch('http://localhost:3000/api/reserve', {
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
		<form onSubmit={ handleSubmit }>
			<div className='form'>
				<label htmlFor='date'><h2>Pilih Tanggal</h2></label>
				<input
					type='date'
					id='date'
					name='date'
                    value={ formData.date }
                    onChange={ handleChange }
				/>
			</div>
			<div className='form'>
				<label htmlFor='time_slot_id'><h2>Pilih Sesi</h2></label>
				<select
                    id='time_slot_id'
                    name='time_slot_id'
                    value={ formData.time_slot_id }
                    onChange={ handleChange }
                >
					{ timeSlot.map(({ _id, start, end }) => {
                        return (
                            <option key={ _id } value={ _id }>
								{ String(start.hour).padStart(2, '0') }:{ String(start.minute).padStart(2, '0') }
								-
								{ String(end.hour).padStart(2, '0') }:{ String(end.minute).padStart(2, '0') }
							</option>
						)
					}) }
                    <option value={ '' }>Masukan Sesi</option> 
				</select>
			</div>
			<input
        	    className='form'
        	    type='submit'
        	    value='Pesan'
        	/>
		</form>
  	)
}

export default Form