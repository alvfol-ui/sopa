import './WordList.css';

const WordList = ({ words, foundWords, themeColor }) => {
    return (
        <div className="word-list">
            {words.map(word => {
                const isFound = foundWords[word];
                return (
                    <span
                        key={word}
                        className={`word-item ${isFound ? 'word-found' : ''}`}
                        style={isFound ? {
                            color: foundWords[word].color,
                            textDecorationColor: foundWords[word].color
                        } : {}}
                    >
                        {word.toLowerCase()}
                    </span>
                );
            })}
        </div>
    );
};

export default WordList;
