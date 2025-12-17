import { Participant } from '../types';

interface ParticipantListProps {
  participants: Participant[];
  onRemove?: (id: string) => void;
  showGuesses?: boolean;
}

export default function ParticipantList({ participants, onRemove, showGuesses = false }: ParticipantListProps) {
  if (participants.length === 0) {
    return (
      <div className="participant-list empty">
        <p>No participants yet. Add some to get started!</p>
      </div>
    );
  }

  return (
    <div className="participant-list">
      <h2>Participants</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id} className="participant-item">
            <span className="participant-name">{participant.name}</span>
            {showGuesses && (
              <span className="participant-guess">{participant.guess}</span>
            )}
            {!showGuesses && (
              <span className="participant-guess hidden">?</span>
            )}
            {onRemove && (
              <button
                onClick={() => onRemove(participant.id)}
                className="remove-btn"
                aria-label={`Remove ${participant.name}`}
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

