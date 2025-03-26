import React, { useState, useEffect } from "react";
import { eventBus } from "./Event/EventBus";
import styles from "../styles/Widget.module.css";

interface StopwatchProps {
    id: string;
    removeWidget: (id: string) => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({ id, removeWidget }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval: number | null = null;
        if (isRunning) {
            interval = window.setInterval(() => {
                setTime((prev) => Math.round((prev + 0.1) * 10) / 10);
            }, 100);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isRunning]);

    return (
        <div className={styles.widget}>
            <div className={styles.widget__display}>
                <h3 className={styles.widget__title}>{time}s</h3>
            </div>
            <div className={styles.widget__buttons}>
                <div className={styles.widget__controls}>
                    <button className={styles.widget__button} onClick={() => setIsRunning(!isRunning)}>
                        {isRunning ? "Pause" : "Start"}
                    </button>
                    <button className={`${styles.widget__button} ${styles["widget__button--reset"]}`} onClick={() => eventBus.emit("resetTimer")}>
                        Reset
                    </button>
                </div>
                <button className={`${styles.widget__button} ${styles["widget__button--remove"]}`} onClick={() => removeWidget(id)}>
                    Remove
                </button>
            </div>
        </div>
    );
};

export default Stopwatch;
