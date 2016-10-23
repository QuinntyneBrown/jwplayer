export const emit = (eventName: string, $event: any) => {
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    for (var prop in $event) {
        event[prop] = $event[prop];
    }
    document.dispatchEvent(event);
}

export class EventHub {

    constructor() {
        document.addEventListener('playerEvent',(event: any) => {
            this._handlers.forEach((handler) => {
                if ((handler.index && handler.index === event.index) || !handler.index)
                    handler.onPlayerEvent(event);
            });
        });
    }

    private static _instance;

    public static get Instance(): EventHub {
        EventHub._instance = EventHub._instance || new EventHub();
        return EventHub._instance;
    }

    public events: Array<string> = ['buffer', 'bufferChange', 'ready', 'play', 'pause', 'complete', 'seek', 'error', 'playlistItem', 'time', 'firstFrame'];

    private _handlers: Array<{ onPlayerEvent: Function, index?:number }> = [];

    public addEventHandler(handler: { onPlayerEvent: Function,index?: number }) {
        this._handlers.push(handler)
    }

    public addEventHandlers(handlers: Array<{ onPlayerEvent: Function, index?: number }>) {
        handlers.forEach((handler) => this.addEventHandler(handler));
    }

    public addJWPlayer(jwPlayerContainerComponent: any) {
        this.events.forEach((type) => {
            jwPlayerContainerComponent.playerInstance
                .on(type, (event) => {
                    emit("playerEvent",
                        {
                            index: jwPlayerContainerComponent.index,
                            playerEvent: event,
                            playerEventType: type,
                            playerInstance: jwPlayerContainerComponent.playerInstance
                        }
                    );
                });
        });
    }
}