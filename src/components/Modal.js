import React from 'react'
import Confetti from 'react-confetti'

export default function Modal({isCorrect, turn, solution}) {

    function handleRestartClick(){
        window.location.reload(false)
    }

  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>You win!!</h1>
                <p className='solution'>{solution}</p>
                <p>You found the solution in {turn} guesses</p>
                <p onClick={handleRestartClick} className='replay'>Play again</p>
                <Confetti />
            </div>
        )}
        {!isCorrect && (
            <div>
                <h1>Nevermind try again</h1>
                <p className='solution'>{solution}</p>
                <p>Better luck next time</p>
                <p onClick={handleRestartClick} className='replay'>Play again</p>
            </div>
        )}
    </div>
  )
}
