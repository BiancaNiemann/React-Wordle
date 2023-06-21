import React from 'react'

export default function Row({ guess }) {
    if (guess) {
        return (
            <div className="row past">
                {guess.map((l, i) => {
                    return <div className={l.color} key={i}>{l.key}</div>
                })}
            </div>
        )
    }

    return (
        <div className='row'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
