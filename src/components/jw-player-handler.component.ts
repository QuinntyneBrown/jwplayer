import { Store } from "../services";
import { Input, Notify, Log, Component } from "../decorators";
import { jwPlayerState, playlistState, keys } from "./enums";

declare var jwplayer;

@Component({
    template: require("./jw-player-handler.html")
})
export class JWPlayerHandlerComponent {
    constructor(private _element: any, private _store:Store) { }

    private _playerInstance;

    private get playerInstance() {
        this._playerInstance = this._playerInstance || jwplayer(this._element.querySelector(".jw-player"));
        return this._playerInstance;
    }

    public activate() {            
        this.playerInstance.setup({
            height: this.height,
            width: this.width,
            aspectratio: this.aspectRatio,
            setfullscreen: true,
            playlist: this.playlist,
            nextupoffset: this.nextupoffset,
            autostart:this.autostart,
            events: {
                onAdCompanions: event => this.onAdCompanions(event),
                onBeforeComplete: event => this.onBeforeComplete(event),
                onBeforePlay: event => this.onBeforePlay(event),
                onBuffer: event => this.onBuffer(),
                onBufferChange: event => this.onBufferChange(event),
                onComplete: event => this.onComplete(),
                onError: event => this.onError(event),
                onFirstFrame: event => this.onFirstFrame(event),
                onIdle: event => this.onIdle(),
                onPlay: event => this.onPlay(),
                onPlaylistComplete: event => this.onPlaylistComplete(),
                onPlaylistItem: event => this.onPlaylistItem(event),
                onPause: event => this.onPause(),
                onReady: event => this.onReady(),
                onTime: event => this.onTime(event)
            }
        });
    }

    @Log()
    public onAdCompanions(event) { }

    @Log()
    public onBeforeComplete(event) { }

    @Log()
    public onBeforePlay(event) { }

    @Log()
    public onBuffer() { this.playerState = jwPlayerState.BUFFER; }
    
    @Log()
    public onBufferChange(event) {
        (this._element.querySelector(".jw-player-toast") as HTMLElement).textContent = this.playerState == jwPlayerState.BUFFER
            ? `buffer: ${event.bufferPercent}%`
            : "";
    }

    @Log()
    @Notify("complete")
    public onComplete() { this.watchHistoryPosition = 0; }

    @Log()
    @Notify("error")
    public onError(event: { message: string }) { }
    
    @Log()
    public onIdle() { this.playerState = jwPlayerState.IDLE; }

    @Log()
    @Notify("playlistcomplete")
    public onPlaylistComplete() { this.watchHistoryIndex = 0; this.watchHistoryMediaId = ""; }

    @Log()
    public onFirstFrame(event) { }

    @Log()
    @Notify("playlistitem")
    public onPlaylistItem(event) {          
        if (this.playlistState != playlistState.LOADED && this.shouldResume) {
            this.playlistState = playlistState.LOADED;
            this._playerInstance.playlistItem(this.watchHistoryIndex);
        } else if (this.playlistState == playlistState.LOADED && this.shouldResume) {
            this._playerInstance.seek(this.watchHistoryPosition);
        } else if (this.playlistState != playlistState.LOADED && !this.shouldResume) {
            this.watchHistoryMediaId = null;
            this.watchHistoryPosition = null;            
            this.watchHistoryIndex = 1;            
            this.playlistState = playlistState.LOADED;
        }               
    }

    public get shouldResume() {
        if (this.watchHistoryIndex == null)
            return false;
        return this.playlist[this.watchHistoryIndex].mediaid == this.watchHistoryMediaId && this.watchHistoryPosition != null && this.watchHistoryPosition >= 0;
    }
   
    
    @Notify("play")
    public onPlay() { this.playerState = jwPlayerState.PLAY; }

    @Log()
    public onPause() { this.playerState = jwPlayerState.PAUSE; }

    @Log()
    @Notify("ready")
    public onReady() { }

    @Notify("time")
    @Log()
    public onTime(event: { position: number }) { this.watchHistoryPosition = event.position; }

    @Input()
    public aspectRatio: string;

    @Input()
    public playlist: any;

    @Input()
    public height: string;

    @Input()
    public width: string;

    @Input()
    public nextupoffset: string;

    @Input()
    public autostart: boolean;
    
    public get watchHistoryPosition() { return this._store.get({ name: keys.WATCH_HISTORY_POSITION }); }

    public set watchHistoryPosition(value) { this._store.put({ name: keys.WATCH_HISTORY_POSITION, value: value }) }

    public get watchHistoryIndex() { return this._store.get({ name: keys.WATCH_HISTORY_INDEX }); }

    public set watchHistoryIndex(value) { this._store.put({ name: keys.WATCH_HISTORY_INDEX, value: value }); }

    private playerState: jwPlayerState;   

    private playlistState: playlistState = playlistState.NOT_LOADED;
    
    public get watchHistoryMediaId() { return this._store.get({ name: keys.WATCH_HISTORY_MEDIA_ID }); }

    public set watchHistoryMediaId(value) { this._store.put({ name: keys.WATCH_HISTORY_MEDIA_ID, value: value }); } 
}


