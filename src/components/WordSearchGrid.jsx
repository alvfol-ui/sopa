import { useRef } from 'react';
import './WordSearchGrid.css';

const WordSearchGrid = ({
    grid,
    foundWords,
    selection,
    onStartSelection,
    onUpdateSelection,
    onEndSelection
}) => {
    const gridRef = useRef(null);

    const getCellHighlight = (x, y) => {
        // Check if cell is in current selection
        const inSelection = selection.some(pos => pos.x === x && pos.y === y);
        if (inSelection) {
            return { backgroundColor: 'rgba(33, 150, 243, 0.5)' };
        }

        // Check if cell is part of a found word
        for (const [word, data] of Object.entries(foundWords)) {
            const inWord = data.positions.some(pos => pos.x === x && pos.y === y);
            if (inWord) {
                return { backgroundColor: data.color };
            }
        }

        return {};
    };

    const handleMouseDown = (x, y) => {
        onStartSelection(x, y);
    };

    const handleMouseEnter = (x, y) => {
        onUpdateSelection(x, y);
    };

    const handleMouseUp = () => {
        onEndSelection();
    };

    const handleTouchStart = (e, x, y) => {
        e.preventDefault();
        onStartSelection(x, y);
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element && element.dataset.x !== undefined) {
            onUpdateSelection(parseInt(element.dataset.x), parseInt(element.dataset.y));
        }
    };

    const handleTouchEnd = () => {
        onEndSelection();
    };

    return (
        <div
            ref={gridRef}
            className="word-search-grid"
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
        >
            {grid.map((row, y) => (
                <div key={y} className="grid-row">
                    {row.map((cell, x) => (
                        <div
                            key={`${x}-${y}`}
                            data-x={x}
                            data-y={y}
                            className="grid-cell"
                            style={getCellHighlight(x, y)}
                            onMouseDown={() => handleMouseDown(x, y)}
                            onMouseEnter={() => handleMouseEnter(x, y)}
                            onTouchStart={(e) => handleTouchStart(e, x, y)}
                        >
                            {cell.letter}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default WordSearchGrid;
