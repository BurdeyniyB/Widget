import React, { useState, useEffect, useCallback } from "react";
import { timerManager } from "../utils/TimerManager";
import styles from "../styles/Widget.module.css";

interface TimerProps {
    id: string;
    removeWidget: (id: string) => void;
}

const Timer: React.FC<TimerProps> = React.memo(({ id, removeWidget }) => {
    const [time, setTime] = useState(60);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning && time > 0) {
            timerManager.startTime(id, () => {
                setTime((prev) => Math.round((prev - 0.1) * 10) / 10);
            }, 100);
        } else if (time === 0) {
            timerManager.stopTime(id);
        }

        return () => {
            timerManager.stopTime(id);
        };
    }, [isRunning, time, id]);

 
    const resetTimer = useCallback(() => {
        timerManager.stopTime(id);
        setIsRunning(false);
        setTime(60);
    }, [id]);


    const handleRemoveWidget = useCallback(() => {
        removeWidget(id);
    }, [id, removeWidget]);

    return (
        <div className={styles.widget}>
            <div className={styles.widget__display}>
                <h3 className={styles.widget__title}>{time}s</h3>
            </div>
            <div className={styles.widget__buttons}>
                <div className={styles.widget__controls}>
                    <button className={styles.widget__button} onClick={() => setIsRunning((prev) => !prev)}>
                        {isRunning ? "Pause" : "Start"}
                    </button>
                    <button className={`${styles.widget__button} ${styles["widget__button--reset"]}`} onClick={resetTimer}>
                        Reset
                    </button>
                </div>
                <button className={`${styles.widget__button} ${styles["widget__button--remove"]}`} onClick={handleRemoveWidget}>
                    Remove
                </button>
            </div>
        </div>
    );
});

export default Timer;
