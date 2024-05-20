import style from './style.css'
import Queue from './Queue'
import Logout from './Logout'
import { getSession } from '@/app/libs/server'
import { redirect } from 'next/navigation'

const months = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];

const Home = async () => {
	const session = await getSession()
	if (!session.isLoggedIn)
	{
		redirect('/login')

		return null
        // go to login page
	}

	const account = await (await fetch(`http://localhost:3000/api/account/${ session.username }`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})).json()

	let queues = []
	if (account.reservation.length === 0) {
		queues.push({
			number: '-',
			time: '',
			date: '',
			desc1: 'Anda Belum Memiliki Nomor Antrian',
			desc2: 'Silakan Reservasi Terlebih Dahulu',
		})
	}
	for (let i = 0; i < account.reservation.length; i++) {
		const { reservation_id, queue_number } = account.reservation[i]

		const reservation = await (await fetch(`http://localhost:3000/api/reservation/${ reservation_id }`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})).json()
		const { date, time_slot_id } = reservation
		const fdate = new Date(date)

		const timeSlot = await (await fetch(`http://localhost:3000/api/time_slot/${ time_slot_id }`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})).json()
		const { start, end } = timeSlot

		const queue = {
			number: queue_number,
			time: `
				${ String(start.hour).padStart(2, '0') }:${ String(start.minute).padStart(2, '0') } -
				 ${ String(end.hour).padStart(2, '0') }:${ String(end.minute).padStart(2, '0') }
			`,
			date: `
				 ${ fdate.getDate() } ${ months[fdate.getMonth()] } ${ fdate.getFullYear() }
			`,
			desc1: 'Harap datang 10 menit sebelumnya untuk registrasi ulang',
			desc2: 'Apabila terjadi keterlambatan maka tidak akan ada tambahan waktu bagi sesi tersebut'
		}

		queues.push(queue)
	}

  	return (
  	  	<>
  	  	<header>
  	  	  	<h3>Selamat Sore,</h3>
  	  	  	<h1><b>{ account.name }</b></h1>
  	  	  	<h3>Ada yang bisa kami obati?</h3>
  	  	</header>
  	  	<body>
			<Queue queues={ queues } />
  	  	  	<a className='card-dark' href='/reserve'>
  	  	  	  	<h1>Reservasi <b>+</b></h1>
  	  	  	</a>
			<Logout />
  	  	</body>
  	  	</>
  	);
}

export default Home