import { JWPlayerComponent } from "./jw-player.component";
import { NotificationsComponent } from "./notifications.component";
import { TitleComponent } from "./title.component";
import { LocalStorageService } from "../services";

import { PLAYER_POSITION } from "../constants";

export class JWPlayerContainerComponent {
    constructor(private _element: HTMLElement) { }

    public activate() {
        this._element.innerHTML = require("../templates/jw-player-container.html");        
        this._jwPlayerComponent = new JWPlayerComponent(this._jwPlayerElement);
        this._jwPlayerComponent.file = this.file;
        this._jwPlayerComponent.height = this.height;
        this._jwPlayerComponent.width = this.width;

        this._jwPlayerComponent.events = {
            onReady: this.onReady,
            onComplete: this.onComplete,
            onPlay: this.onPlay,
            onBuffer: this.onBuffer,
            onBufferChange: this.onBufferChange
        };        

        this._notificationsComponent = new NotificationsComponent(this._notificationsElement);
        this._jwPlayerComponent.activate();        
    }

    public onReady = () => { this._jwPlayerComponent.seek(this.position); }

    public onComplete = () => { this.position = 0; }
   
    public onTime = (event) => { this.position = event.position; }

    public onBufferChange = (event) => {
        this._notificationsComponent.message = this._state == "buffer"
            ? event.bufferPercent
            : "";
    }

    public onBuffer = () => { this._state = "buffer"; }

    public onPlay = () => { this._state = "play"; }

    public get playerInstance() { return this._jwPlayerComponent.playerInstance; }
    private _jwPlayerComponent: JWPlayerComponent;
    private _state: string;    
    private _notificationsComponent: NotificationsComponent;
    private get _jwPlayerElement(): HTMLElement {
        return this._element.querySelector(".jw-player") as HTMLElement;
    }
    private get _notificationsElement(): HTMLElement {
        return this._element.querySelector(".jw-player-notifications") as HTMLElement;
    }
    public title: string;
    public file: string;
    public height: string;
    public width: string;
    public index: number;
    public get position() {
        return LocalStorageService.Instance.get({ name: `${PLAYER_POSITION}-${this.index}` })
    }
    public set position(value) {
        LocalStorageService.Instance.put({ name: `${PLAYER_POSITION}-${this.index}`, value: value })
    }
}