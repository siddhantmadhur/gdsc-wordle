import { useEffect, useState } from "react";
import "./App.css";

const keyboard = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

const keyboard_hash = new Map();

function App() {
  const [attempts, setAttempts] = useState([""]);

  const [chosenWord, setChosenWord] = useState("")

  useEffect(() => {
    setChosenWord("piper")
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
      keyboard_hash.set(letter, 1)
      const prevAttempts = attempts;
      let cur = prevAttempts.pop();
      if (cur.length >= 5) {
        prevAttempts.push(cur);
        prevAttempts.push(ev.key.toLowerCase());
      } else {
        cur += ev.key.toLowerCase();
        prevAttempts.push(cur);
      }
      setAttempts([...prevAttempts]);
    });
  }, []);

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
            .map((attempt, idx) => {
              return (
                <div className="attempt" key={idx}>
                  {attempt?.split("").map((char, key) => {
                    return (
                      <div className="char" key={key}>
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
                  <div className={`keyboard-key ${keyboard_hash.get(key) === 1 ? 'key-correct' : '' }`} key={keyId}>
                    {key}
                  </div>
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
