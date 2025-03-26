type TimeCallback = () => void;

class TimeManager {
    private timers: { [key: string]: number } = {};

    public startTime(id: string, callback: TimeCallback, interval: number): void {
        if (this.timers[id]) {
            return;
        }

        const timerId = window.setInterval(callback, interval);
        this.timers[id] = timerId;
    }

    public stopTime(id: string): void {
        if (this.timers[id]) {
            window.clearInterval(this.timers[id]);
            delete this.timers[id];
        }
    }
}

export const timerManager = new TimeManager();
