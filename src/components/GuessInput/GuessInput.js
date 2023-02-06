import React from "react";

const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const secondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];
const minMaxLength = 5;


function GuessInput({ onGuess, isDisabled, guessedLetters }) {
  const [value, setValue] = React.useState("");

  const defineClass = React.useCallback((letter) => {
    let matchLetter = guessedLetters?.findLast(item => item.letter === letter)
    return matchLetter?.status
  }, [guessedLetters])

  const handleSubmit = (event) => {
    event.preventDefault();
    onGuess(value);
    setValue("");
  };
  const handleVirtualKeyInput = (letter) => {
    if (value.length >= minMaxLength) {
      alert(`Max length ${minMaxLength} reached`);
      return;
    }
    setValue((prev) => prev + letter);
  };
  const handleBackspace = () => setValue(prev => prev.substring(0, prev.length - 1));

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        minLength={minMaxLength}
        maxLength={minMaxLength}
        pattern="^[A-Z]{5}$"
        placeholder="Only letters. Min-max. 5."
        disabled={isDisabled}
        value={value}
        onChange={(e) => setValue(e.target.value.toUpperCase())}
      />
      <div className="keys">
        <div className="row">
          {firstRow.map((letter) => (
            <button
              type="button"
              key={letter}
              className={defineClass(letter)}
              onClick={() => handleVirtualKeyInput(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="row">
          {secondRow.map((letter) => (
            <button
              type="button"
              key={letter}
              className={defineClass(letter)}
              onClick={() => handleVirtualKeyInput(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="row">
          <button type="submit" className="function">
            ↩
          </button>
          {thirdRow.map((letter) => (
            <button
              type="button"
              key={letter}
              className={defineClass(letter)}
              onClick={() => handleVirtualKeyInput(letter)}
            >
              {letter}
            </button>
          ))}
          <button type="button" className="function" onClick={handleBackspace}>
            ⌫
          </button>
        </div>
      </div>
    </form>
  );
}

export default GuessInput;
