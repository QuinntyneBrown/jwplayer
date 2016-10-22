declare var jwplayer: any;

import { EventEmitter } from "../utils";
import { NotificationsComponent } from "./notifications.component";

export class JWPlayerComponent {
    constructor(
        private _nativeElement: HTMLElement,
        private _hotificationsComponent: NotificationsComponent
    ) { }

    public events: Array<string> = ['ready', 'play', 'pause', 'complete', 'seek', 'error', 'playlistItem', 'time', 'firstFrame'];

    public title: string;

    public file: string;

    public height: string;

    public width: string;

    public playerEvent: EventEmitter = new EventEmitter();

    private _playerInstance: any = null;

    public get playerInstance(): any {
        this._playerInstance = this._playerInstance || jwplayer(this._nativeElement);
        return this._playerInstance;
    }

    public activate() {
        this.playerInstance.setup({
            file: this.file,
            height: this.height,
            width: this.width
        });
        this.handleEventsFor(this.playerInstance);
    }

    public handleEventsFor = (player: any) => {
        this.events.forEach((type) => {
            this.playerInstance
                .on(type, (event) => {                    
                    this.playerEvent.emit(
                        {
                            playerEvent: event,
                            playerEventType: type,
                            playerInstance: this.playerInstance
                        }
                    );
                });
        });
    }
}