import React from 'react'

/**
 *  @param {object} props
 *  @param {string} props.currentGuess
 *  @param {string[]} props.guesses
 *  @param {string} props.correctWord
 *  @returns {JSX.Element}
 * */
function WordGuess (props) {
    return (
        <div className="">
            {
                props.guesses.map((currentGuess, guessNumber)=>(
                    <div className="attempt" key={guessNumber}>
                        {currentGuess.split("").map((char, charIdx) => {
                            return (
                                <div 
                                    className={`
                                        char
                                        ${props.correctWord.includes(char) ? 
                                            props.correctWord.at(charIdx) === char ? 'key-correct' : 'key-almost-correct' : 'key-wrong'}
                                    `}
                                    key={charIdx}
                                >{char}</div>
                            )
                        })}
                    </div>
                ))
            }

            <div className="attempt">
            {
                props.guesses.at(props.guesses.length - 1) !== props.correctWord ? (props.currentGuess
                .split("")
                .concat([...Array(5 - props.currentGuess.length)])
                .map((char, charIdx)=>{
                    return <div className="char" key={charIdx}>{char}</div>
                })) : null
            }
            </div>
        </div>
    )
}

export default WordGuess;
