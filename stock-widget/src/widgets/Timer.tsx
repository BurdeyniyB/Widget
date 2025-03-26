import React, { useState, useEffect } from "react";
import { eventBus } from "./Event/EventBus";
import { timerManager } from "../utils/TimeManager";
import styles from "../styles/Widget.module.css";

interface TimerProps {
    id: string;
    removeWidget: (id: string) => void;
}

const Timer: React.FC<TimerProps> = ({ id, removeWidget }) => {
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
    }, [isRunning, time]);

    useEffect(() => {
        const resetHandler = () => setTime(60);  
        eventBus.on("resetTimer", resetHandler);

        return () => {
            eventBus.off("resetTimer", resetHandler);
        };
    }, []);

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

export default Timer;
