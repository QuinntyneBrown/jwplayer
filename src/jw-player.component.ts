declare var jwplayer: any;

import { EventEmitter } from "./event-emitter";

export class JWPlayerComponent {
    constructor(private _nativeElement: HTMLElement) { }

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

    activate() {
        this.playerInstance.setup({
            file: this.file,
            height: this.height,
            width: this.width
        });
        this.handleEventsFor(this.playerInstance);
    }

    public handleEventsFor = (player: any) => {
        //this.events.forEach((type) => {
        //    this.playerInstance
        //        .on(type, function (event) {
        //            this.playerEvent.emit(
        //                {
        //                    playerId: this.uniqueId,
        //                    event: event,
        //                    type: type,
        //                    playerInstance: this.playerInstance
        //                }
        //            );
        //        });
        //});
    }

}