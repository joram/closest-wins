interface RollButtonProps {
  onRoll: () => void;
  disabled?: boolean;
}

export default function RollButton({ onRoll, disabled }: RollButtonProps) {
  return (
    <button
      onClick={onRoll}
      disabled={disabled}
      className="roll-button"
    >
      Roll!
    </button>
  );
}

