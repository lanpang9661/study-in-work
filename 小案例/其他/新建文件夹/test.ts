interface IEvent<T> {
    on(handler: { (data?: T): void }): void;
    off(handler: { (data?: T): void }): void;
}

class Events<T> implements IEvent<T> {
    handlers: { (data?: T): void; }[] = [];

    public on(handler: { (data?: T): void }): void {
        this.handlers.push(handler);
    }

    public off(handler: { (data?: T): void }): void {
        const idx = this.handlers.lastIndexOf(handler);
        if (idx > -1) {
            this.handlers.splice(idx, 1);
        }
    }

    public notify(data?: T) {
        this.handlers.slice(0).forEach(h => h(data));
    }
}

let ev = new Events();
ev.on( (click) => {
    console.log(click);
} )

ev.on( (mouseover) => {
    console.log(mouseover);
} )

ev.on( (show) => {
    console.log(show);
} )


console.log(ev);

ev.notify('click')