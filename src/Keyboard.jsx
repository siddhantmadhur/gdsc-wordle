import React from 'react'

const keyboard_keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];



/**
 *  @description Returns a keyboard that can be interacted with
 *  @param {object} props
 *  @param {Object.<string, number>} props.keys Map with key being a letter, and the value being 0 if the user hasn't guessed it, 1 if it's guessed but wrong, 2 if correct but in the wrong place, and 3 if correct and in the right place
 *  @param {(arg0: string) => void} props.handleKey
 * */
function Keyboard (props) {
    return (
    <div className="keyboard">
          {keyboard_keys.map((row, rowId) => (
            <div className="keyboard-row" key={rowId}>
              {row.map((key, keyId) => {
                return (
                    <button 
                        onClick={() => props.handleKey(key)}
                        key={keyId}
                        className={`
                            keyboard-key 
                            ${typeof props.keys[key] === 'undefined' ? '': ''}
                            ${props.keys[key] === 1 ? 'key-wrong': ''}
                            ${props.keys[key] === 2 ? 'key-almost-correct': ''}
                            ${props.keys[key] === 3 ? 'key-correct': ''}
                        `}
                        >
                        {key}
                    </button>           
                );
              })}
            </div>
          ))}
        </div>
    )
}

export default Keyboard;

