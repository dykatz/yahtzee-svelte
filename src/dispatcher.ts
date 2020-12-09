export class DispatcherQueue {
    registry: Map<string, Set<Function>>;
    defer: boolean;
    deferred: Array<Array<any>>;

    constructor() {
        this.registry = new Map();
        this.defer = false;
        this.deferred = new Array();
    }

    enlist(name: string, func: Function) {
        let event: Set<Function> = this.registry.get(name);

        if (event === undefined) {
            event = new Set();
            this.registry.set(name, event);
        }

        event.add(func);
    }

    delist(name: string, func: Function) {
        let event: Set<Function> = this.registry.get(name);

        if (event !== undefined) {
            event.delete(func);
        }
    }

    clear(name: string) {
        this.registry.delete(name);
    }

    emit(name: string, ...args: any[]) {
        if (this.defer) {
            this.deferred.push([name, ...args]);
            return;
        }

        let event: Set<Function> = this.registry.get(name);

        if (event === undefined) {
            return;
        }

        this.defer = true;
        event.forEach(func => func(...args));

        let call = this.deferred.pop();
        
        while (call !== undefined) {
            let [deferredName, ...deferredArgs] = call;
            let deferredEvent: Set<Function> = this.registry.get(deferredName);

            if (deferredEvent !== undefined) {
                deferredEvent.forEach(func => func(...deferredArgs));
            }

            call = this.deferred.pop();
        }

        this.defer = false;
    }
}

export let Dispatcher: DispatcherQueue = new DispatcherQueue();
