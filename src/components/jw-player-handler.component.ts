import { Store } from "../services";
import { Input, DispatchEvent, Log, Component } from "../decorators";
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

    @DispatchEvent("connectedCallback")
    public connectedCallback() {                    
        this.playerInstance.setup({
            height: this.height,
            width: this.width,
            aspectratio: this.aspectRatio,
            setfullscreen: true,
            playlist: this.playlist,
            nextupoffset: this.nextupoffset,
            autostart:this.autostart,
            events: {
                onAdCompanions: this.onAdCompanions.bind(this),
                onBeforeComplete: this.onBeforeComplete.bind(this),
                onBeforePlay: this.onBeforePlay.bind(this),
                onBuffer: this.onBuffer.bind(this),
                onBufferChange: this.onBufferChange.bind(this),
                onComplete: this.onComplete.bind(this),
                onError: this.onError.bind(this),
                onFirstFrame: this.onFirstFrame.bind(this),
                onIdle: this.onIdle.bind(this),
                onPlay: this.onPlay.bind(this),
                onPlaylistComplete: this.onPlaylistComplete.bind(this),
                onPlaylistItem: this.onPlaylistItem.bind(this),
                onPause: this.onPause.bind(this),
                onReady: this.onReady.bind(this),
                onTime: this.onTime.bind(this)
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
    @DispatchEvent("complete")
    public onComplete() {  }

    @Log()
    @DispatchEvent("error")
    public onError(event: { message: string }) { }
    
    @Log()
    public onIdle() { this.playerState = jwPlayerState.IDLE; }

    @Log()
    @DispatchEvent("playlistcomplete")
    public onPlaylistComplete() { this.watchHistoryPosition = null; this.watchHistoryIndex = null; this.watchHistoryMediaId = null; }

    @Log()
    public onFirstFrame(event) { }

    @Log()
    @DispatchEvent("playlistitem")
    public onPlaylistItem(event) {      
        if (this.playerState == jwPlayerState.INITIAL) {
            if (this.playlistState != playlistState.LOADED && this.shouldResume) {
                this.playlistState = playlistState.LOADED;
                this._playerInstance.playlistItem(this.watchHistoryIndex);
            } else if (this.playlistState == playlistState.LOADED && this.shouldResume) {
                this._playerInstance.seek(this.watchHistoryPosition);
            } else if (this.playlistState != playlistState.LOADED && !this.shouldResume) {
                this.watchHistoryMediaId = this.playlist[0].mediaid;
                this.watchHistoryPosition = null;
                this.watchHistoryIndex = 0;
                this.playlistState = playlistState.LOADED;
            } 
        } else {
            this.watchHistoryMediaId = this.playlist[event.index].mediaid;
            this.watchHistoryPosition = null;
            this.watchHistoryIndex = event.index;
        }
              
    }

    public get shouldResume() {
        if (this.watchHistoryIndex == null)
            return false;
        return this.playlist[this.watchHistoryIndex].mediaid == this.watchHistoryMediaId && this.watchHistoryPosition != null && this.watchHistoryPosition >= 0;
    }
   
    @Log()
    @DispatchEvent("play")
    public onPlay() { this.playerState = jwPlayerState.PLAY; }

    @Log()
    public onPause() { this.playerState = jwPlayerState.PAUSE; }

    @Log()
    @DispatchEvent("ready")
    public onReady() { }

    @DispatchEvent("time")
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

    private _playerState: jwPlayerState = jwPlayerState.INITIAL;
     
    public set playerState(value) { this._playerState = value; }

    public get playerState() { return this._playerState; }

    public getPlayerState() { return this._playerState; }

    public playlistState: playlistState = playlistState.INITIAL;

    public get element() { return this._element; }
    
    public get watchHistoryMediaId() { return this._store.get({ name: keys.WATCH_HISTORY_MEDIA_ID }); }

    public set watchHistoryMediaId(value) { this._store.put({ name: keys.WATCH_HISTORY_MEDIA_ID, value: value }); } 
}


