import React, { useState, useEffect, useCallback } from "react";
import { timerManager } from "../utils/TimerManager";
import styles from "../styles/Widget.module.css";

interface StopwatchProps {
    id: string;
    removeWidget: (id: string) => void;
}

const Stopwatch: React.FC<StopwatchProps> = React.memo(({ id, removeWidget }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning) {
            timerManager.startTime(id, () => {
                setTime((prev) => Math.round((prev + 0.1) * 10) / 10);
            }, 100);
        } else {
            timerManager.stopTime(id);
        }

        return () => {
            timerManager.stopTime(id);
        };
    }, [isRunning, id]);

    const resetStopwatch = useCallback(() => {
        timerManager.stopTime(id);
        setIsRunning(false);
        setTime(0);
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
                    <button className={`${styles.widget__button} ${styles["widget__button--reset"]}`} onClick={resetStopwatch}>
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

export default Stopwatch;
