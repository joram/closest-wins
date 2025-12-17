import { useState } from 'react';

interface ParticipantFormProps {
  onAdd: (name: string, guess: number) => void;
}

export default function ParticipantForm({ onAdd }: ParticipantFormProps) {
  const [name, setName] = useState('');
  const [guess, setGuess] = useState<number | ''>('');

  const handlePickForMe = () => {
    const randomGuess = Math.floor(Math.random() * 101);
    setGuess(randomGuess);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && guess !== '' && guess >= 0 && guess <= 100) {
      onAdd(name.trim(), Number(guess));
      setName('');
      setGuess('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="participant-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          placeholder="Guess (0-100)"
          min="0"
          max="100"
          value={guess}
          onChange={(e) => setGuess(e.target.value === '' ? '' : Number(e.target.value))}
          className="guess-input"
          required
        />
        <button
          type="button"
          onClick={handlePickForMe}
          className="pick-for-me-btn"
        >
          Pick for me
        </button>
      </div>
      <button type="submit" className="add-btn">
        Add Participant
      </button>
    </form>
  );
}

