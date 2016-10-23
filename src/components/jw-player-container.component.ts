import { JWPlayerComponent } from "./jw-player.component";
import { NotificationsComponent } from "./notifications.component";
import { TitleComponent } from "./title.component";
import { LocalStorageService } from "../services";

import { PLAYER_POSITION } from "../constants";

export class JWPlayerContainerComponent {
    constructor(private _nativeElement: HTMLElement) { }
    public title: string;
    public file: string;
    public height: string;
    public width: string;
    public index: number;

    public activate() {
        this._nativeElement.innerHTML = require("../templates/jw-player-container.html");        
        this._jwPlayerComponent = new JWPlayerComponent(this._jwPlayerNativeElement);
        this._jwPlayerComponent.file = this.file;
        this._jwPlayerComponent.height = this.height;
        this._jwPlayerComponent.width = this.width;        
        this._notificationsComponent = new NotificationsComponent(this._notificationsNativeElement);
        this._jwPlayerComponent.activate();        
    }

    public get position() {
        return LocalStorageService.Instance.get({ name: `${PLAYER_POSITION}-${this.index}` })
    }

    public set position(value) {
        LocalStorageService.Instance.put({ name: `${PLAYER_POSITION}-${this.index}`, value: value })
    }

    public onPlayerEvent = (event: any) => {
        switch (event.playerEventType) {
            case "bufferChange":
                if (this._state == "buffer") {
                    this._notificationsComponent.message = event.playerEvent.bufferPercent;
                } else {
                    this._notificationsComponent.message = "";
                }
                break;

            case "buffer":
                this._state = "buffer";
                break;

            case "play":
                this._state = "play";
                break;

            case "time":
                this.position = event.playerEvent.position;
                break;

            case "ready":
                this._jwPlayerComponent.seek(this.position);
                break;

            case "complete":
                this.position = 0;
                break; 
        }
    }    
    
    public get playerInstance() { return this._jwPlayerComponent.playerInstance; }

    private _jwPlayerComponent: JWPlayerComponent;

    private _state: string;    
    private _notificationsComponent: NotificationsComponent;
    private get _jwPlayerNativeElement(): HTMLElement {
        return this._nativeElement.querySelector(".jw-player") as HTMLElement;
    }
    private get _notificationsNativeElement(): HTMLElement {
        return this._nativeElement.querySelector(".jw-player-notifications") as HTMLElement;
    }
}