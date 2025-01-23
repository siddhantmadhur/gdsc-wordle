import React, { useEffect } from 'react'
import WordGrid from './WordGrid'

import './App.css'
import { useState } from 'react'
import Keyboard from './Keyboard'
import words from './random_words'



function App() {


    /**
     *  @description Previous description
     * */
    const [pastGuesses, setPastGuesses] = useState(/** @type{string[]} */([]))

    // Current Guess
    const [guess, setGuess] = useState("")

    // The actual current word
    const [correctWord, setCorrectWord] = useState("")
    

    /**
     *  @param {string} key
     * */
    const handleKey = (key) => {
        setGuess(
            (e) => {
                if (e.length >= 4)
                {
                    setPastGuesses((p)=>{
                        p.push(e + key)
                        return p
                    })
                    return ""
                }
                return e + key
            }
        )
    }

    const backspaceKey = () => {
        setGuess((e) => {
            if (e.length > 0) {
                return e.substring(0, e.length - 1)
            }
            return ""
        })
    }

    useEffect(()=>{

        setCorrectWord(words[Math.round(Math.random() * (words.length - 1))])


        document.addEventListener("keydown", (ev) => {
            const letter = ev.key.toLowerCase();
            if (ev.key === 'Backspace') {
                backspaceKey()
                return;

            }
            if (
                letter > "z" ||
                    letter < "a" ||
                    ev.type !== "keydown" ||
                    letter.length > 1
            ) {
                return;
            }
            handleKey(letter)
        });
    },[])


    useEffect(()=>{
        const lastGuess = pastGuesses.at(pastGuesses.length - 1)
        if (lastGuess === correctWord) {
            alert("Correct word guessed: " + correctWord)
            setCorrectWord(words[Math.round(Math.random() * words.length)])
            setPastGuesses([])
            setGuess("")
        }
    }, [guess, pastGuesses, correctWord])

    return (
        <main>
            <div>
                <h1>Word guessing game</h1>
            </div>
            <div>
                <WordGrid 
                    currentGuess={guess} 
                    guesses={pastGuesses} 
                    correctWord={correctWord}
                /> 
            </div>
            <div>
                <Keyboard 
                    handleKey={handleKey}
                    correctWord={correctWord}
                    pastGuesses={pastGuesses}
                />
            </div>
        </main>
    ) 
}

export default App;
