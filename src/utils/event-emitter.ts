export class EventEmitter {
    constructor() { }

    public emit($event) {
        var event = document.createEvent('Event');
        event.initEvent('playerEvent', true, true);        
        for (var prop in $event) {
            event[prop] = $event[prop];
        }
        document.dispatchEvent(event);
    }
}