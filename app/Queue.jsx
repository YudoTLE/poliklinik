'use client'

import { useState } from 'react'

const Queue = ({ queues }) => {
    const n = queues.length
    const [idx, setIdx] = useState(0)
    
    const handleClickPrev = () => {
        setIdx((idx + n - 1) % n)
    }
    const handleClickNext = () => {
        setIdx((idx + 1) % n)
    }

  	return (
        <div className='card-white'>
            <h1>Nomor Antrian Anda</h1>
            <div className='pagination'>
                { n > 1 ?
                    <div class='navigate' onClick={ handleClickPrev }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
                            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                        </svg>
                    </div> : null
                }
                <div className='card-dark queue'>
                    <div className='number'>
                          { queues[idx].number }
                    </div>
                    <h3>
                          { queues[idx].time }
                    </h3>
                    <h3>
                          { queues[idx].date }
                    </h3>
                </div>
                { n > 1 ?
                    <div className='navigate' onClick={ handleClickNext }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
                              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                        </svg>
                    </div> : null
                }
            </div>
            <h4>{ queues[idx].desc1 }</h4>
            <h4>{ queues[idx].desc2 }</h4>
        </div>
  	)
}

export default Queue