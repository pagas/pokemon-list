type StateListener<T> = (items: T[]) => void

export class BaseState<T> {
    protected listeners: StateListener<T>[] = [];

    addListener(listenerFn: StateListener<T>) {
        this.listeners.push(listenerFn);
    }
}
