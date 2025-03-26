type EventHandler = (...args: any[]) => void;

class EventBus {
    private events: Map<string, EventHandler[]> = new Map();

    on(event: string, handler: EventHandler) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(handler);
    }

    off(event: string, handler: EventHandler) {
        if (this.events.has(event)) {
            this.events.set(event, this.events.get(event)!.filter(h => h !== handler));
        }
    }

    emit(event: string, ...args: any[]) {
        if (this.events.has(event)) {
            this.events.get(event)!.forEach(handler => handler(...args));
        }
    }
}

export const eventBus = new EventBus();
