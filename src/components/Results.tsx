import { RankedResult } from '../types';

interface ResultsProps {
  target: number;
  results: RankedResult[];
}

export default function Results({ target, results }: ResultsProps) {
  if (results.length === 0) {
    return null;
  }

  const winnerDistance = results[0].distance;

  return (
    <div className="results">
      <div className="target-display">
        <h2>Target Number</h2>
        <div className="target-number">{target}</div>
      </div>
      <div className="rankings">
        <h3>Rankings</h3>
        <ol className="results-list">
          {results.map((result, index) => {
            const isWinner = result.distance === winnerDistance;
            return (
              <li
                key={result.participant.id}
                className={`result-item ${isWinner ? 'winner' : ''}`}
              >
                <span className="rank">{index + 1}</span>
                <span className="result-name">{result.participant.name}</span>
                <span className="result-guess">Guess: {result.participant.guess}</span>
                <span className="result-distance">Distance: {result.distance}</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

