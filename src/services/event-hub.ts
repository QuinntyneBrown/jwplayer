import { emit } from "../utils";

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
        if (!EventHub._instance) {
            EventHub._instance = new EventHub();
        }

        return EventHub._instance;
    }

    public events: Array<string> = ['buffer', 'bufferChange', 'ready', 'play', 'pause', 'complete', 'seek', 'error', 'playlistItem', 'time', 'firstFrame'];

    private _handlers: Array<{ onPlayerEvent: Function, index?:number }> = [];

    public addEventHandler(handler: { onPlayerEvent: Function,index?: number }) {
        this._handlers.push(handler)
    }

    public addJWPlayer(jwPlayerContainerComponent: any) {

        this.addEventHandler(jwPlayerContainerComponent);

        this.events.forEach((type) => {
            jwPlayerContainerComponent.jwPlayerComponent.playerInstance
                .on(type, (event) => {
                    emit("playerEvent",
                        {
                            index: jwPlayerContainerComponent.index,
                            playerEvent: event,
                            playerEventType: type,
                            playerInstance: jwPlayerContainerComponent.jwPlayerComponent.playerInstance
                        }
                    );
                });
        });
    }
}