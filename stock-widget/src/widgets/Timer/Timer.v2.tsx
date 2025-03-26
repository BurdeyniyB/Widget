import React, { useState, useEffect, useCallback, useContext } from "react";
import { timerManager } from "../../utils/TimerManager";
import styles from "../../styles/Widget.module.css";
import { WidgetContext } from "../../context/WidgetContext";

interface TimerProps {
    id: string;
    version: number;
    removeWidget: (id: string) => void;
}

const Timer: React.FC<TimerProps> = React.memo(({ id, version, removeWidget }) => {
    const [time, setTime] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const widgetContext = useContext(WidgetContext);

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

    const handleUpdateWidget = useCallback(() => {
        if (widgetContext) {
            widgetContext.updateWidget(id, 'Timer', version + 1);
        }
    }, [id, widgetContext]);

    return (
        <div className={styles.widget}>
            <h2>Timer 2</h2>
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

export default Timer;
