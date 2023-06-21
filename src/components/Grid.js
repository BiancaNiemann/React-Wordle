import React from 'react'
import Row from './Row'

export default function Grid({ currentGuess, guesses, turn }) {
    console.log(guesses, 'Grid')
  return (
    <div>
        {guesses.map((g, i)=> {
            return <Row key={i} guess={g}/>
        })}
    </div>
  )
}
