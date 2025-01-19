import { useEffect, useState } from "react";
import "./App.css";
import words from "./random_words";

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const keyboard_hash = new Map();


const set_input_letter = (letter, attempts, setAttempts) => {

      const prevAttempts = attempts;
      let cur = prevAttempts.pop();
        cur += letter 
        prevAttempts.push(cur);
      if (cur.length >= 5) {

        cur.split("").forEach((char, charIdx)=>{
          if (chosenWord.indexOf(char) !== -1 && keyboard_hash.get(char) !== 2) {
            keyboard_hash.set(char, 1)
          }
          if (chosenWord.at(charIdx) === cur.at(charIdx) && keyboard_hash.get(char) !== 2) {
            keyboard_hash.set(char, 2)
          }
        })

        prevAttempts.push("");
      }
      setAttempts([...prevAttempts]);
}

const chosenWord = words[Math.round(Math.random() * (words.length ))]

function History (props) {
  return <div>Attempts taken: </div>
}

function App() {
  const [attempts, setAttempts] = useState([""]);

  useEffect(() => {
    document.addEventListener("keydown", (ev) => {
      const letter = ev.key.toLowerCase();
      if (ev.key === 'Backspace') {
        const prevAttempts = attempts;
        if (prevAttempts.length > 0) {
          let cur = prevAttempts.pop()
          cur = cur.substring(0, cur.length - 1)
          prevAttempts.push(cur)
        }
        setAttempts([...prevAttempts])

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
      set_input_letter(letter, attempts, setAttempts)
    });
  }, []);

  useEffect(()=>{
    if (attempts.length <= 1) {
      return;
    }
    if (attempts[attempts.length - 2] === chosenWord) {
      // TODO: Make this more sophisticated

    }
  }, [attempts])

  return (
    <>
      <main>
        <div>
          <h1>Word Guesser</h1>
        </div>
        <div className="attempt-grid">
          {attempts
            .concat([...Array(attempts.length <= 5 ? 5 - attempts.length : 0)])
            .filter((val, i) => i < 5)
            .map((e) => (typeof e === "undefined" ? "" : e))
            .map((attempt, attemptIdx) => {
              return (
                <div className="attempt" key={attemptIdx}>
                  {attempt?.split("").map((char, charIdx) => {
                    if (attempts.length - 1 === attemptIdx) {
                    return (
                      <div className={`char`} key={charIdx}>
                        {char}
                      </div>
                    );

                    }
                    return (
                      <div className={`char ${char === chosenWord.at(charIdx) ? 'key-correct': chosenWord.indexOf(char) !== -1 ? 'key-almost-correct' : 'key-wrong'}`} key={charIdx}>
                        {char}
                      </div>
                    );
                  })}
                  {attempt.length < 5 ? (
                    <>
                      {[...Array(5 - attempt?.length)].map((n, char_key) => (
                        <div key={char_key} className="char"></div>
                      ))}
                    </>
                  ) : null}
                </div>
              );
            })}
        </div>
        <div className="keyboard">
          {keyboard.map((row, rowId) => (
            <div className="keyboard-row" key={rowId}>
              {row.map((key, keyId) => {
                return (
                  <button onClick={()=>set_input_letter(key, attempts, setAttempts)} className={`keyboard-key ${keyboard_hash.get(key) === 2 ? 'key-correct' : keyboard_hash.get(key) === 1 ? 'key-almost-correct' : typeof keyboard_hash.get(key) !== 'undefined' ? 'key-wrong'  : ''}`} key={keyId}>
                    {key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
