import { useState } from "react"

const useWordle = (solution) => {

    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)
    const [usedKeys, setUsedKeys] = useState({})

    const formatGuess= () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((letter)=> {
            return { key: letter, color: 'grey'}
        })

        //find any green letter (letter in correct position)
        formattedGuess.forEach((letter, i)=> {
            if (solutionArray[i] === letter.key){
                formattedGuess[i].color= 'green'
                solutionArray[i] = null
            }
        })

        //find any yellow colors
        formattedGuess.forEach((letter, i) => {
            if(solutionArray.includes(letter.key) && letter.color !== 'green'){
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(letter.key)] = null
            }
        })
        return formattedGuess
    }

    const addNewGuess = (formattedGuess)=> {
        if (currentGuess === solution){
            setIsCorrect(true)
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prevHistory)=> {
            return [...prevHistory, currentGuess]
        })
        setTurn((prevTurn) => {
            return prevTurn + 1
        })

        setUsedKeys(prevUsedKeys => {

            formattedGuess.forEach(l => {
              const currentColor = prevUsedKeys[l.key]
      
              if (l.color === 'green') {
                prevUsedKeys[l.key] = 'green'
                return
              }
              if (l.color === 'yellow' && currentColor !== 'green') {
                prevUsedKeys[l.key] = 'yellow'
                return
              }
              if (l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                prevUsedKeys[l.key] = 'grey'
                return
              }
            })
            return prevUsedKeys
          })
        setCurrentGuess('')
    }

    const handleKeyup = ({ key }) => {

        if(key === 'Enter'){
            //only add guess if turn less than 5
            if (turn > 5){
                console.log('you used all guesses')
                return
            }
            // do not allow duplicate words
            if (history.includes(currentGuess)){
                console.log('you already have that word')
                return
            }
            //check word is 5 chars long
            if (currentGuess.length !==5){
                console.log('word not long enough')
                return
            }

            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        if (key === 'Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
            })
        }

        if (/^[A-Za-z]$/.test(key)){
            if (currentGuess.length < 5){
                setCurrentGuess((prev)=> {
                    return prev + key
                })
            }
        }


    }

    return { turn, currentGuess, guesses, isCorrect, handleKeyup , usedKeys };
}
 
export default useWordle;