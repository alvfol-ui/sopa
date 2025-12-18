import { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ initialMinutes = 10, onTimeUp, isPaused = false }) => {
    const [seconds, setSeconds] = useState(initialMinutes * 60);

    useEffect(() => {
        if (isPaused || seconds <= 0) return;

        const interval = setInterval(() => {
            setSeconds(prev => {
                if (prev <= 1) {
                    onTimeUp?.();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused, seconds, onTimeUp]);

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const formatTime = () => {
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isLowTime = seconds < 60;

    return (
        <div className={`timer ${isLowTime ? 'timer-low' : ''}`}>
            <span className="timer-icon">⏱️</span>
            <span className="timer-value">{formatTime()}</span>
        </div>
    );
};

export default Timer;
