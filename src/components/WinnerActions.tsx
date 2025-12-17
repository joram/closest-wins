interface WinnerActionsProps {
  onReroll: () => void;
  onRemoveWinner: () => void;
  hasWinner: boolean;
}

export default function WinnerActions({ onReroll, onRemoveWinner, hasWinner }: WinnerActionsProps) {
  if (!hasWinner) {
    return null;
  }

  return (
    <div className="winner-actions">
      <button onClick={onReroll} className="reroll-btn">
        Reroll
      </button>
      <button onClick={onRemoveWinner} className="remove-winner-btn">
        Remove Winner
      </button>
    </div>
  );
}

