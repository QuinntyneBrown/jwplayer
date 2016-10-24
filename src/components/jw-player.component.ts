import { LocalStorageService } from "../services";
import { Notify, Log } from "../decorators";

export class JWPlayerComponent {
    constructor(private _element: HTMLElement, public playerInstance:any, public file, private height, private width, private index) {
        _element.innerHTML = require("../templates/jw-player.html");

        playerInstance.setup({
            file: file,
            height: height,
            width: width,
            setFullScreen: true,
            events: {
                onReady: event => this.onReady(),
                onComplete: event => this.onComplete(),
                onPlay: event => this.onPlay(),
                onBuffer: event => this.onBuffer(),
                onBufferChange: event => this.onBufferChange(event),
                onIdle: event => this.onIdle(),
                onPause: event => this.onPause(),
                onTime: event => this.onTime(event),
                onBeforePlay: event => this.onBeforePlay(event),
                onBeforeComplete: event => this.onBeforeComplete(event),
                onAdCompanions: event => this.onAdCompanions(event),
                onPlaylistItem: event => this.onPlaylistItem(event)
            }
        });
    }
    
    
    @Notify("ready")
    public onReady() {
        this.playerInstance.seek(this.position);
    }

    @Notify("complete")
    public onComplete() { this.position = 0; }

    @Notify("time")
    @Log()
    public onTime(event) { this.position = event.position; }

    public onBeforePlay(event) {

    }

    public onBeforeComplete(event) {

    }

    public onAdCompanions(event) {

    }

    public onBufferChange(event) {
        this.message = this._state == "buffer"
            ? event.bufferPercent
            : "";
    }

    @Log()
    @Notify("playlistitem")
    public onPlaylistItem(event) {
        
    }
    
    public onBuffer() { this._state = "buffer"; }

    public onPlay() { this._state = "play"; }

    public onIdle() { this._state = "idle"; }

    public onPause() { this._state = "pause"; }

    public set message(value: string) { (this._element.querySelector(".jw-player-notifications") as HTMLElement).innerText = value; }
        
    private _state: string;    

    public get position() { return LocalStorageService.Instance.get({ name: `jwplayer-position-${this.index}` }) }

    public set position(value) { LocalStorageService.Instance.put({ name: `jwplayer-position-${this.index}`, value: value }) }
}