import { NotificationsComponent } from "./notifications.component";
import { TitleComponent } from "./title.component";
import { LocalStorageService } from "../services";
import { PLAYER_POSITION } from "../constants";
import { Notify } from "../decorators";

var storage = LocalStorageService.Instance;

declare var jwplayer: any;

export class JWPlayerComponent {
    constructor(private _element: HTMLElement) { }
    
    public activate() {        
        this._element.innerHTML = require("../templates/jw-player-container.html");                
        this._notificationsComponent = new NotificationsComponent(this._element.querySelector(".jw-player-notifications"));
        this.playerInstance.setup({
            file: this.file,
            height: this.height,
            width: this.width,
            setFullScreen: true,
            events: {
                onReady: event => this.onReady(),
                onComplete: event => this.onComplete(),
                onPlay: event => this.onPlay(),
                onBuffer: event => this.onBuffer(),
                onBufferChange: event => this.onBufferChange(event),
                onIdle: event => this.onIdle(),
                onPause: event => this.onPause(),
                onTime: event => this.onTime(event)
            }
        });         
    }

    private _playerInstance: any = null;

    public get playerInstance(): any {
        this._playerInstance = this._playerInstance || jwplayer(this._element.querySelector(".jw-player"));
        return this._playerInstance;
    }

    @Notify("ready")
    public onReady() {
        this.playerInstance.seek(this.position);
    }

    public onComplete = () => { this.position = 0; }

    @Notify("time")
    public onTime(event) { this.position = event.position; }

    public onBufferChange = (event) => {
        this._notificationsComponent.message = this._state == "buffer"
            ? event.bufferPercent
            : "";
    }
    
    public onBuffer() { this._state = "buffer"; }

    public onPlay() { this._state = "play"; }

    public onIdle() { this._state = "idle"; }

    public onPause() { this._state = "pause"; }

    private _jwPlayerComponent: JWPlayerComponent;
    private _state: string;    
    private _notificationsComponent: NotificationsComponent;
    
    public title: string;
    public file: string;
    public height: string;
    public width: string;
    public index: number;
    public get position() { return storage.get({ name: `${PLAYER_POSITION}-${this.index}` }) }
    public set position(value) { storage.put({ name: `${PLAYER_POSITION}-${this.index}`, value: value }) }
}