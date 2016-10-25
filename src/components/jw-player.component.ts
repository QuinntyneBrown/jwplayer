import { LocalStorageService } from "../services";
import { Notify, Log } from "../decorators";

export class JWPlayerComponent {
    constructor(private _element: any, public playerInstance:any, private _localStorage:LocalStorageService, public file, private height, private width, private index) {
        _element.innerHTML = require("../templates/jw-player.html");

        playerInstance.setup({
            file: file,
            height: height,
            width: width,
            setFullScreen: true,
            events: {
                onReady: event => this.onReady(),
                onComplete: event => this.onComplete(),
                onError: event => this.onError(event),
                onPlay: event => this.onPlay(),
                onFirstFrame: event => this.onFirstFrame(event),
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

    @Log()
    public onFirstFrame(event) {

    }

    public onBeforePlay(event) {

    }

    public onBeforeComplete(event) {

    }

    public onAdCompanions(event) {

    }

    public onBufferChange(event) {
        (this._element.querySelector(".jw-player-notifications") as HTMLElement).innerText = this._state == "buffer"
            ? `buffer: ${event.bufferPercent}%`
            : "";
    }

    public onError(event) {
        
    }

    @Log()
    @Notify("playlistitem")
    public onPlaylistItem(event) {
        
    }
    
    public onBuffer() { this._state = "buffer"; }

    @Notify("play")
    public onPlay() { this._state = "play"; }

    public onIdle() { this._state = "idle"; }

    public onPause() { this._state = "pause"; }

    public get position() { return this._localStorage.get({ name: `jw-player-position-${this.index}` }) }

    public set position(value) { this._localStorage.put({ name: `jw-player-position-${this.index}`, value: value }) }

    private _state: string;    

}