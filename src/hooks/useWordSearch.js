import { useState, useCallback } from 'react';

const GRID_SIZE = 10;
const DIRECTIONS = [
    { dx: 1, dy: 0 },   // horizontal right
    { dx: -1, dy: 0 },  // horizontal left
    { dx: 0, dy: 1 },   // vertical down
    { dx: 0, dy: -1 },  // vertical up
    { dx: 1, dy: 1 },   // diagonal down-right
    { dx: -1, dy: -1 }, // diagonal up-left
    { dx: 1, dy: -1 },  // diagonal up-right
    { dx: -1, dy: 1 },  // diagonal down-left
];

const generateEmptyGrid = () => {
    return Array(GRID_SIZE).fill(null).map(() =>
        Array(GRID_SIZE).fill(null).map(() => ({ letter: '', wordIds: [] }))
    );
};

const canPlaceWord = (grid, word, startX, startY, direction) => {
    for (let i = 0; i < word.length; i++) {
        const x = startX + i * direction.dx;
        const y = startY + i * direction.dy;

        if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
            return false;
        }

        const cell = grid[y][x];
        if (cell.letter !== '' && cell.letter !== word[i]) {
            return false;
        }
    }
    return true;
};

const placeWord = (grid, word, wordId, startX, startY, direction) => {
    const positions = [];
    for (let i = 0; i < word.length; i++) {
        const x = startX + i * direction.dx;
        const y = startY + i * direction.dy;
        grid[y][x].letter = word[i];
        grid[y][x].wordIds.push(wordId);
        positions.push({ x, y });
    }
    return positions;
};

const fillEmptyCells = (grid) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            if (grid[y][x].letter === '') {
                grid[y][x].letter = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }
};

const generatePuzzle = (words) => {
    const grid = generateEmptyGrid();
    const wordPlacements = {};
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);

    for (const word of shuffledWords) {
        let placed = false;
        const shuffledDirections = [...DIRECTIONS].sort(() => Math.random() - 0.5);

        for (let attempts = 0; attempts < 100 && !placed; attempts++) {
            const startX = Math.floor(Math.random() * GRID_SIZE);
            const startY = Math.floor(Math.random() * GRID_SIZE);

            for (const direction of shuffledDirections) {
                if (canPlaceWord(grid, word, startX, startY, direction)) {
                    const positions = placeWord(grid, word, word, startX, startY, direction);
                    wordPlacements[word] = { positions, direction };
                    placed = true;
                    break;
                }
            }
        }
    }

    fillEmptyCells(grid);
    return { grid, wordPlacements };
};

const HIGHLIGHT_COLORS = [
    '#e91e9e', // magenta
    '#2196f3', // blue
    '#ff9800', // orange
    '#4caf50', // green
    '#9c27b0', // purple
    '#00bcd4', // cyan
    '#f44336', // red
    '#ffeb3b', // yellow
];

export const useWordSearch = (words) => {
    const [puzzle, setPuzzle] = useState(() => generatePuzzle(words));
    const [foundWords, setFoundWords] = useState({});
    const [selection, setSelection] = useState([]);
    const [isSelecting, setIsSelecting] = useState(false);

    const startSelection = useCallback((x, y) => {
        setIsSelecting(true);
        setSelection([{ x, y }]);
    }, []);

    const updateSelection = useCallback((x, y) => {
        if (!isSelecting) return;

        setSelection(prev => {
            if (prev.length === 0) return [{ x, y }];

            const start = prev[0];
            const newSelection = [];

            const dx = x - start.x;
            const dy = y - start.y;

            // Determine direction
            let stepX = 0, stepY = 0;
            if (dx !== 0) stepX = dx > 0 ? 1 : -1;
            if (dy !== 0) stepY = dy > 0 ? 1 : -1;

            // Only allow straight lines (horizontal, vertical, diagonal)
            const absDx = Math.abs(dx);
            const absDy = Math.abs(dy);

            if (absDx !== 0 && absDy !== 0 && absDx !== absDy) {
                return prev;
            }

            const steps = Math.max(absDx, absDy);

            for (let i = 0; i <= steps; i++) {
                newSelection.push({
                    x: start.x + i * stepX,
                    y: start.y + i * stepY
                });
            }

            return newSelection;
        });
    }, [isSelecting]);

    const endSelection = useCallback(() => {
        if (!isSelecting) return;

        setIsSelecting(false);

        // Check if selection forms a word
        const selectedWord = selection
            .map(pos => puzzle.grid[pos.y][pos.x].letter)
            .join('');

        const reversedWord = selectedWord.split('').reverse().join('');

        // Check if word exists in placements
        if (puzzle.wordPlacements[selectedWord] && !foundWords[selectedWord]) {
            const colorIndex = Object.keys(foundWords).length % HIGHLIGHT_COLORS.length;
            setFoundWords(prev => ({
                ...prev,
                [selectedWord]: {
                    positions: selection,
                    color: HIGHLIGHT_COLORS[colorIndex]
                }
            }));
        } else if (puzzle.wordPlacements[reversedWord] && !foundWords[reversedWord]) {
            const colorIndex = Object.keys(foundWords).length % HIGHLIGHT_COLORS.length;
            setFoundWords(prev => ({
                ...prev,
                [reversedWord]: {
                    positions: selection,
                    color: HIGHLIGHT_COLORS[colorIndex]
                }
            }));
        }

        setSelection([]);
    }, [isSelecting, selection, puzzle, foundWords]);

    const solveAll = useCallback(() => {
        const allFound = {};
        let colorIndex = 0;

        for (const [word, data] of Object.entries(puzzle.wordPlacements)) {
            if (!foundWords[word]) {
                allFound[word] = {
                    positions: data.positions,
                    color: HIGHLIGHT_COLORS[colorIndex % HIGHLIGHT_COLORS.length]
                };
                colorIndex++;
            }
        }

        setFoundWords(prev => ({ ...prev, ...allFound }));
    }, [puzzle, foundWords]);

    const resetPuzzle = useCallback(() => {
        setPuzzle(generatePuzzle(words));
        setFoundWords({});
        setSelection([]);
    }, [words]);

    return {
        grid: puzzle.grid,
        wordPlacements: puzzle.wordPlacements,
        foundWords,
        selection,
        isSelecting,
        startSelection,
        updateSelection,
        endSelection,
        solveAll,
        resetPuzzle,
        isComplete: Object.keys(foundWords).length === Object.keys(puzzle.wordPlacements).length
    };
};
