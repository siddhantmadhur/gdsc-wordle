import React from 'react'

const keyboard_keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];


/**
 *  @param {string} key
 *  @param {string[]} guesses
 *  @param {string} correctWord
 *  @returns {number}
 *  @description Returns 0 if a character is not in guess, 1 if it is in a guess but wrong, 2 if it is in both the guess and the correct word, and finally 3 if it's correct, and in the right place 
 * */
const hasKeyBeenUsed = (key, guesses, correctWord) => {
    let used = 0
   
    guesses.forEach((guess)=>{
        if (guess.includes(key))
        {
            if (used <= 1){
                used = 1
            }
            if (correctWord.includes(key) && used <= 2){
                used = 2
            }
            guess.split("").forEach((char, charIdx)=>{
                if (char === key){
                    if (correctWord.charAt(charIdx) === key){
                        used = 3
                    }
                }
            })
        }
    })

    return used
}


