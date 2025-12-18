import { useState, useRef } from 'react';
import { themes, themeList } from '../data/themes';
import './SpinningWheel.css';

const SpinningWheel = ({ onThemeSelected }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const wheelRef = useRef(null);

    const segmentAngle = 360 / themeList.length;

    const spin = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setSelectedTheme(null);

        const fullRotations = 4 + Math.random() * 3;
        const randomAngle = Math.random() * 360;
        const totalRotation = rotation + fullRotations * 360 + randomAngle;

        setRotation(totalRotation);

        setTimeout(() => {
            const normalizedRotation = ((totalRotation % 360) + 360) % 360;
            const pointerAngle = (360 - normalizedRotation + segmentAngle / 2) % 360;
            const selectedIndex = Math.floor(pointerAngle / segmentAngle) % themeList.length;
            const theme = themeList[selectedIndex];

            setSelectedTheme(theme);
            setIsSpinning(false);

            setTimeout(() => {
                onThemeSelected(theme);
            }, 1800);
        }, 5000);
    };

    return (
        <div className="wheel-container">
            <div className="wheel-glow"></div>

            <div className="wheel-header">
                <h1 className="wheel-title">
                    <span className="title-emoji">🔤</span>
                    <span className="title-text">Sopa de Letras</span>
                </h1>
                <p className="wheel-subtitle">¡Gira la ruleta para elegir tu tema!</p>
            </div>

            <div className="wheel-stage">
                <div className="wheel-frame">
                    <div className="wheel-lights">
                        {[...Array(24)].map((_, i) => (
                            <div
                                key={i}
                                className={`wheel-light ${isSpinning ? 'spinning' : ''}`}
                                style={{
                                    transform: `rotate(${i * 15}deg) translateY(-185px)`,
                                    animationDelay: `${i * 0.05}s`
                                }}
                            />
                        ))}
                    </div>

                    <div className="wheel-pointer-container">
                        <div className="wheel-pointer">
                            <div className="pointer-arrow"></div>
                            <div className="pointer-glow"></div>
                        </div>
                    </div>

                    <svg
                        ref={wheelRef}
                        className={`wheel ${isSpinning ? 'spinning' : ''}`}
                        viewBox="0 0 400 400"
                        style={{
                            transform: `rotate(${rotation}deg)`,
                        }}
                    >
                        <defs>
                            {themeList.map((themeKey, index) => {
                                const theme = themes[themeKey];
                                return (
                                    <linearGradient
                                        key={`grad-${themeKey}`}
                                        id={`gradient-${themeKey}`}
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor={theme.color} />
                                        <stop offset="100%" stopColor={adjustColor(theme.color, -30)} />
                                    </linearGradient>
                                );
                            })}
                            <filter id="inner-shadow">
                                <feOffset dx="0" dy="2" />
                                <feGaussianBlur stdDeviation="3" result="offset-blur" />
                                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                                <feFlood floodColor="black" floodOpacity="0.3" result="color" />
                                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                            </filter>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        <circle cx="200" cy="200" r="185" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />

                        {themeList.map((themeKey, index) => {
                            const theme = themes[themeKey];
                            const startAngle = index * segmentAngle;
                            const endAngle = (index + 1) * segmentAngle;

                            const startRad = (startAngle - 90) * Math.PI / 180;
                            const endRad = (endAngle - 90) * Math.PI / 180;

                            const x1 = 200 + 175 * Math.cos(startRad);
                            const y1 = 200 + 175 * Math.sin(startRad);
                            const x2 = 200 + 175 * Math.cos(endRad);
                            const y2 = 200 + 175 * Math.sin(endRad);

                            const largeArc = segmentAngle > 180 ? 1 : 0;

                            const midAngle = (startAngle + endAngle) / 2 - 90;
                            const midRad = midAngle * Math.PI / 180;
                            const emojiX = 200 + 110 * Math.cos(midRad);
                            const emojiY = 200 + 110 * Math.sin(midRad);
                            const textX = 200 + 140 * Math.cos(midRad);
                            const textY = 200 + 140 * Math.sin(midRad);

                            return (
                                <g key={themeKey}>
                                    <path
                                        d={`M 200 200 L ${x1} ${y1} A 175 175 0 ${largeArc} 1 ${x2} ${y2} Z`}
                                        fill={`url(#gradient-${themeKey})`}
                                        stroke="rgba(255,255,255,0.4)"
                                        strokeWidth="2"
                                        filter="url(#inner-shadow)"
                                    />
                                    <text
                                        x={emojiX}
                                        y={emojiY}
                                        fontSize="28"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        transform={`rotate(${midAngle + 90}, ${emojiX}, ${emojiY})`}
                                        filter="url(#glow)"
                                    >
                                        {theme.emoji}
                                    </text>
                                    <text
                                        x={textX}
                                        y={textY}
                                        fill="#fff"
                                        fontSize="10"
                                        fontWeight="700"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
                                    >
                                        {theme.name.toUpperCase()}
                                    </text>
                                </g>
                            );
                        })}

                        <circle cx="200" cy="200" r="45" fill="url(#center-gradient)" stroke="#fff" strokeWidth="4" />
                        <defs>
                            <radialGradient id="center-gradient" cx="30%" cy="30%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#1e3a5f" />
                            </radialGradient>
                        </defs>
                        <text x="200" y="200" fill="#fff" fontSize="24" textAnchor="middle" dominantBaseline="middle">🎯</text>
                    </svg>
                </div>
            </div>

            {selectedTheme && (
                <div className="selected-theme-reveal">
                    <div className="reveal-content" style={{ '--theme-color': themes[selectedTheme].color }}>
                        <span className="reveal-emoji">{themes[selectedTheme].emoji}</span>
                        <span className="reveal-name">{themes[selectedTheme].name}</span>
                        <div className="reveal-sparkles">✨</div>
                    </div>
                </div>
            )}

            <button
                className={`spin-button ${isSpinning ? 'spinning' : ''}`}
                onClick={spin}
                disabled={isSpinning}
            >
                <span className="button-icon">{isSpinning ? '🎡' : '🎰'}</span>
                <span className="button-text">{isSpinning ? 'Girando...' : '¡Girar Ruleta!'}</span>
                <div className="button-shine"></div>
            </button>
        </div>
    );
};

// Helper function to darken/lighten colors
function adjustColor(hex, amount) {
    const num = parseInt(hex.replace('#', ''), 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export default SpinningWheel;
