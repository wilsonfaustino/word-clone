import React from "react";

import { sample } from "../../utils";
import { checkGuess } from "../../game-helpers";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput";
import GuessResults from "../GuessResults";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [gameStatus, setGameStatus] = React.useState("playing");

  const currentGuess = guesses.length + 1;
  const disableInput = gameStatus !== "playing";

  const handleGuess = (guess) => {
    // If guess was alread tryed throw alert and return
    if (guesses.includes(guess)) {
      alert(`You already tryed ${guess}.\nPlease choose another word.`);
      return;
    }
    if (guess === answer) {
      setGameStatus("won");
    }
    if (currentGuess >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lose");
    }
    setGuesses((prev) => [...prev, guess]);
  };

  const mappedGuesses = guesses.map((guess) => checkGuess(guess, answer));

  const guessedLetters = mappedGuesses.flat();

  return (
    <>
      <GuessResults guesses={mappedGuesses} />
      <GuessInput
        onGuess={handleGuess}
        isDisabled={disableInput}
        guessedLetters={guessedLetters}
      />
      {gameStatus === "won" && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{`${currentGuess -1} ${
              currentGuess > 1 ? "guesses" : "guess"
            }`}</strong>
            .
          </p>
        </div>
      )}
      {gameStatus === "lose" && (
        <div class="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
        </div>
      )}
    </>
  );
}

export default Game;
