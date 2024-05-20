import styles from './style.css'
import Form from './Form'

const Reserve = async () => {
	const timeSlot = await (await fetch(`http://localhost:3000/api/time_slot`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})).json()

  	return (
  	  	<>
			<div className='container card-dark'>
				<Form timeSlot={ timeSlot } />
			</div>
  	  	</>
  	)
}

export default Reserve