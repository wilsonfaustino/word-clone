import React from "react";
import { range } from "../../utils";

function Guess({ guess }) {
  let hasGuess = guess !== undefined;
  return hasGuess ? (
    <p className="guess">
      {guess.map(({letter, status}, i) => (
        <span key={`${letter}-${i}`} className={`cell ${status}`}>
          {letter}
        </span>
      ))}
    </p>
  ) : (
    <p className="guess">
      {range(5).map(item => (
        <span key={item} className="cell" />
      ))}
    </p>
  );
}

export default Guess;
