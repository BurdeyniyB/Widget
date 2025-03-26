import React, { useState, useEffect } from "react";
import { eventBus } from "./Event/EventBus";
import { timerManager } from "../utils/TimeManager"; // Імпортуємо TimerManager
import styles from "../styles/Widget.module.css";

interface StopwatchProps {
    id: string;
    removeWidget: (id: string) => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({ id, removeWidget }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        // Якщо таймер запускається, ми запускаємо його через менеджер
        if (isRunning) {
            timerManager.startTime(id, () => {
                setTime((prev) => Math.round((prev + 0.1) * 10) / 10);
            }, 100);
        } else {
            timerManager.stopTime(id); // Якщо таймер зупиняється, зупиняємо його
        }

        // Очищуємо таймер при демонтажі
        return () => {
            timerManager.stopTime(id);
        };
    }, [isRunning, id]);

    useEffect(() => {
        // Define the event handler for resetTimer
        const resetHandler = () => setTime(0);

        // Subscribe to resetTimer event
        eventBus.on("resetTimer", resetHandler);

        // Cleanup: Unsubscribe when the component unmounts or when dependencies change
        return () => {
            eventBus.off("resetTimer", resetHandler);
        };
    }, []); // Empty dependency array to subscribe only once when the component mounts

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
