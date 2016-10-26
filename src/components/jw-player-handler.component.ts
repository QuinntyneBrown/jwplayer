import { Store } from "../services";
import { Notify, Log, Component } from "../decorators";
import { jwPlayerState, playlistState } from "./enums";

@Component({
    template: require("./jw-player-handler.html")
})
export class JWPlayerHandlerComponent {
    constructor(private _element: any, public playerInstance:any, private _store:Store, private height, private width, private playlist) {                
        playerInstance.setup({
            height: height,
            width: width,
            setFullScreen: true,
            playlist: playlist,
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
    @Notify("error")
    public onError(event: { message: string }) { }
    
    @Log()
    @Notify("ready")
    public onReady() { }
    
    @Log()
    @Notify("complete")
    public onComplete() { this.position = 0;}

    @Log()
    @Notify("playlistcomplete")
    public onPlaylistComplete() { this.playlistIndex = 0; this.currentFile = ""; }

    @Log()
    public onFirstFrame(event) { }

    @Log()
    @Notify("playlistitem")
    public onPlaylistItem(event) {           
        if (this.playlistState == playlistState.NOT_LOADED && this.playlistIndex > 0) {
            this.playlistState = playlistState.LOADED;
            this.playerInstance.playlistItem(this.playlistIndex);            
            this.playerInstance.seek(this.position);
        } else {
            this.setPlaylistIndexAndFile({ playlistIndex: event.index, file: event.item.file });
            this.playlistState = playlistState.LOADED;
            this.playerInstance.seek(this.position);
        }               
    }

    @Log()
    @Notify("setplaylistitem")
    public setPlaylistIndexAndFile(options) {
        this.playlistIndex = options.playlistIndex;
        this.currentFile = options.file;
    }
    
    @Notify("play")
    public onPlay() { this.playerState = jwPlayerState.PLAY; }

    @Log()
    public onIdle() { this.playerState = jwPlayerState.IDLE; }

    @Log()
    public onPause() { this.playerState = jwPlayerState.PAUSE; }
    
    public get position() { return this._store.get({ name: `jw-player-position` }); }

    public set position(value) { this._store.put({ name: `jw-player-position`, value: value }) }

    public get playlistIndex() { return this._store.get({ name: `jw-player-playlist` }); }

    public set playlistIndex(value) { this._store.put({ name: `jw-player-playlist-index`, value: value }); }

    private playerState: jwPlayerState;   

    private playlistState: playlistState = playlistState.NOT_LOADED;
    
    public get currentFile() { return this._store.get({ name: `jw-player-current-file` }); }

    public set currentFile(value) { this._store.put({ name: `jw-player-current-file`, value: value }); } 

    @Notify("time")
    @Log()
    public onTime(event: { position: number }) { this.position = event.position; }
}