import { useState } from 'react';
import SpinningWheel from './components/SpinningWheel';
import WordSearchGrid from './components/WordSearchGrid';
import Timer from './components/Timer';
import WordList from './components/WordList';
import { useWordSearch } from './hooks/useWordSearch';
import { themes } from './data/themes';
import './App.css';

const GameScreen = ({ theme, onBackToMenu }) => {
  const themeData = themes[theme];
  const wordsToUse = themeData.words.slice(0, 10);

  const {
    grid,
    wordPlacements,
    foundWords,
    selection,
    startSelection,
    updateSelection,
    endSelection,
    solveAll,
    isComplete
  } = useWordSearch(wordsToUse);

  const placedWords = Object.keys(wordPlacements);
  const foundCount = Object.keys(foundWords).length;

  return (
    <div className="game-screen">
      <div className="game-header">
        <Timer initialMinutes={10} isPaused={isComplete} />
        <div className="theme-badge" style={{ backgroundColor: themeData.color }}>
          <span>{themeData.emoji}</span>
          <span>{themeData.name}</span>
        </div>
      </div>

      <div className="game-controls">
        <button className="solve-button" onClick={solveAll}>
          Solve
        </button>
      </div>

      <WordSearchGrid
        grid={grid}
        foundWords={foundWords}
        selection={selection}
        onStartSelection={startSelection}
        onUpdateSelection={updateSelection}
        onEndSelection={endSelection}
      />

      <div className="game-progress">
        <span>Encontradas: {foundCount} / {placedWords.length}</span>
      </div>

      <WordList
        words={placedWords}
        foundWords={foundWords}
        themeColor={themeData.color}
      />

      {isComplete && (
        <div className="victory-overlay">
          <div className="victory-content">
            <h2>🎉 ¡Felicidades!</h2>
            <p>Has encontrado todas las palabras</p>
            <button className="play-again-button" onClick={onBackToMenu}>
              Jugar de Nuevo
            </button>
          </div>
        </div>
      )}

      <button className="back-button" onClick={onBackToMenu}>
        ← Volver al Menú
      </button>
    </div>
  );
};

function App() {
  const [gameState, setGameState] = useState('menu'); // 'menu' | 'playing'
  const [selectedTheme, setSelectedTheme] = useState(null);

  const handleThemeSelected = (theme) => {
    setSelectedTheme(theme);
    setGameState('playing');
  };

  const handleBackToMenu = () => {
    setGameState('menu');
    setSelectedTheme(null);
  };

  return (
    <div className="app">
      {gameState === 'menu' && (
        <SpinningWheel onThemeSelected={handleThemeSelected} />
      )}
      {gameState === 'playing' && selectedTheme && (
        <GameScreen
          theme={selectedTheme}
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
}

export default App;
