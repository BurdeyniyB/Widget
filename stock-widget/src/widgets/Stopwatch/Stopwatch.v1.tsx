import React, { useState, useEffect, useCallback, useContext } from "react";
import { timerManager } from "../../utils/TimerManager";
import styles from "../../styles/Widget.module.css";
import { WidgetContext } from "../../context/WidgetContext";

interface StopwatchProps {
    id: string;
    version: number; 
    removeWidget: (id: string) => void;
}

const Stopwatch: React.FC<StopwatchProps> = React.memo(({ id, version, removeWidget }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const widgetContext = useContext(WidgetContext);

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

    const handleUpdateWidget = useCallback(() => {
        if (widgetContext) {
            widgetContext.updateWidget(id, 'Stopwatch', version + 1); // Оновлюємо версію
        }
    }, [id, widgetContext, version]);

    return (
        <div className={styles.widget}>
            <h2>Stopwatch 1</h2>
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
                <div className={styles.widget__controls}>
                    <button className={styles.widget__button} onClick={handleUpdateWidget}>
                        Update Widget
                    </button>
                    <button className={`${styles.widget__button} ${styles["widget__button--remove"]}`} onClick={handleRemoveWidget}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
});

export default Stopwatch;
