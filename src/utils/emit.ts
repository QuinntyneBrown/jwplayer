export const emit = (eventName:string, $event:any) => {
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    for (var prop in $event) {
        event[prop] = $event[prop];
    }
    document.dispatchEvent(event);
}