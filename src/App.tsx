import { useState, useEffect } from 'react';
import { Participant, RankedResult } from './types';
import { saveGameState, loadGameState } from './utils/storage';
import ParticipantForm from './components/ParticipantForm';
import ParticipantList from './components/ParticipantList';
import RollButton from './components/RollButton';
import Results from './components/Results';
import WinnerActions from './components/WinnerActions';
import './App.css';

function App() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [target, setTarget] = useState<number | undefined>(undefined);
  const [results, setResults] = useState<RankedResult[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      setParticipants(savedState.participants || []);
      setTarget(savedState.target);
      setResults(savedState.results || []);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveGameState({
      participants,
      target,
      results,
    });
  }, [participants, target, results]);

  const handleAddParticipant = (name: string, guess: number) => {
    const newParticipant: Participant = {
      id: crypto.randomUUID(),
      name,
      guess,
    };
    setParticipants([...participants, newParticipant]);
    // Clear results when adding new participants
    if (results.length > 0) {
      setResults([]);
      setTarget(undefined);
    }
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(participants.filter((p) => p.id !== id));
    // Clear results if we remove participants
    if (results.length > 0) {
      setResults([]);
      setTarget(undefined);
    }
  };

  const calculateResults = (targetNumber: number): RankedResult[] => {
    return participants
      .map((participant) => ({
        participant,
        distance: Math.abs(participant.guess - targetNumber),
      }))
      .sort((a, b) => a.distance - b.distance);
  };

  const handleRoll = () => {
    if (participants.length === 0) {
      return;
    }
    const targetNumber = Math.floor(Math.random() * 101);
    setTarget(targetNumber);
    const newResults = calculateResults(targetNumber);
    setResults(newResults);
  };

  const handleReroll = () => {
    handleRoll();
  };

  const handleRemoveWinner = () => {
    if (results.length === 0) return;
    const winnerDistance = results[0].distance;
    const winnerIds = results
      .filter((r) => r.distance === winnerDistance)
      .map((r) => r.participant.id);
    setParticipants(participants.filter((p) => !winnerIds.includes(p.id)));
    setResults([]);
    setTarget(undefined);
  };

  const hasWinner = results.length > 0;

  return (
    <div className="app">
      <h1 className="title">Closest Wins</h1>
      
      <div className="game-container">
        <div className="input-section">
          <ParticipantForm onAdd={handleAddParticipant} />
          <ParticipantList
            participants={participants}
            onRemove={handleRemoveParticipant}
          />
          {participants.length > 0 && (
            <RollButton onRoll={handleRoll} disabled={false} />
          )}
        </div>

        {hasWinner && (
          <div className="results-section">
            <Results target={target!} results={results} />
            <WinnerActions
              onReroll={handleReroll}
              onRemoveWinner={handleRemoveWinner}
              hasWinner={hasWinner}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
