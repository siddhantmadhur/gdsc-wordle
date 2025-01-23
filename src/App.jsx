import React, { useEffect } from 'react'
import WordGrid from './WordGrid'

import './App.css'
import { useState } from 'react'
import words from './random_words'


function App() {
    

    const [pastGuesses, setPastGuesses] = useState([])
    const [guess, setGuess] = useState("")
    const [correctWord, setCorrectWord] = useState("")

    return (
        <div>
            Hello, World!
        </div>
    )
}

export default App;
