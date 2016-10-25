import { LocalStorageService } from "../services";
import { Notify, Log } from "../decorators";

export class JWPlayerComponent {
    constructor(private _element: any, public playerInstance:any, private _store:LocalStorageService, private height, private width, private playlist, private index) {                
        playerInstance.setup({
            height: height,
            width: width,
            setFullScreen: true,
            playlist: playlist,
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
                onPlaylistItem: event => this.onPlaylistItem(event),
                onPlaylistComplete: event => this.onPlaylistComplete()
            }
        });
    }
    
    @Log()
    @Notify("ready")
    public onReady() {

    }
    
    @Log()
    @Notify("complete")
    public onComplete() { this.position = 0;}

    @Log()
    @Notify("playlistcomplete")
    public onPlaylistComplete() { this.playlistIndex = 0; }

    @Notify("time")
    @Log()
    public onTime(event) { this.position = event.position; }

    @Log()
    public onFirstFrame(event) {

    }

    @Log()
    public onBeforePlay(event) {

    }

    @Log()
    public onBeforeComplete(event) {

    }

    @Log()
    public onAdCompanions(event) {

    }

    @Log()
    public onBufferChange(event) {
        (this._element.querySelector(".jw-player-notifications") as HTMLElement).innerText = this._state == "buffer"
            ? `buffer: ${event.bufferPercent}%`
            : "";
    }

    @Log()
    @Notify("error")
    public onError(event: { message: string }) {

    }

    @Log()
    @Notify("playlistitem")
    public onPlaylistItem(event) {    
        if (!this._playlistLoaded && this.playlistIndex > 0) {
            this._playlistLoaded = true; 
            this.playerInstance.playlistItem(this.playlistIndex);            
            this.playerInstance.seek(this.position);
        } else {
            this.setPlaylistIndex({ value: event.index });
            this.playerInstance.seek(this.position);
        }               
    }

    @Log()
    @Notify("setplaylistitem")
    public setPlaylistIndex(options) {
        this.playlistIndex = options.value;
    }

    @Log()
    public onBuffer() { this._state = "buffer"; }

    @Notify("play")
    public onPlay() { this._state = "play"; }

    @Log()
    public onIdle() { this._state = "idle"; }

    @Log()
    public onPause() { this._state = "pause"; }
    
    public get position() { return this._store.get({ name: `jw-player-position-${this.index}` }) }

    public set position(value) { this._store.put({ name: `jw-player-position-${this.index}`, value: value }) }

    public get playlistIndex() { return this._store.get({ name: `jw-player-playlist-index-${this.index}` }) }

    public set playlistIndex(value) { this._store.put({ name: `jw-player-playlist-index-${this.index}`, value: value }) }

    private _state: string;    

    private _playlistLoaded = false;

}