type TimerCallback = () => void;

class TimerManager {
    private timers: Map<string, number>;

    constructor() {
        this.timers = new Map<string, number>();
    }

    setInterval(widgetId: string, callback: TimerCallback, delay: number): void {
        this.clearTimer(widgetId); 

        const timerId = window.setInterval(callback, delay);
        this.timers.set(widgetId, timerId);
    }

    setTimeout(widgetId: string, callback: TimerCallback, delay: number): void {
        this.clearTimer(widgetId);

        const timerId = window.setTimeout(() => {
            callback();
            this.timers.delete(widgetId);
        }, delay);

        this.timers.set(widgetId, timerId);
    }

    clearTimer(widgetId: string): void {
        const timerId = this.timers.get(widgetId);
        if (timerId !== undefined) {
            window.clearTimeout(timerId);
            window.clearInterval(timerId);
            this.timers.delete(widgetId);
        }
    }

    startTime(widgetId: string, callback: TimerCallback, interval: number): void {
        this.setInterval(widgetId, callback, interval);
    }

    stopTime(widgetId: string): void {
        this.clearTimer(widgetId);
    }
}

export const timerManager = new TimerManager();
