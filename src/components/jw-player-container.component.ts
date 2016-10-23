import { JWPlayerComponent } from "./jw-player.component";
import { NotificationsComponent } from "./notifications.component";
import { TitleComponent } from "./title.component";

import { emit } from "../utils";

export class JWPlayerContainerComponent {
    constructor(private _nativeElement: HTMLElement) { }
    public title: string;
    public file: string;
    public height: string;
    public width: string;
    public index: number;

    public activate() {
        this._nativeElement.innerHTML = require("../templates/jw-player-container.html");        
        this.jwPlayerComponent = new JWPlayerComponent(this._jwPlayerNativeElement);
        this.jwPlayerComponent.file = this.file;
        this.jwPlayerComponent.height = this.height;
        this.jwPlayerComponent.width = this.width;        
        this._notificationsComponent = new NotificationsComponent(this._notificationsNativeElement);
        this.jwPlayerComponent.activate();        
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
        }
    }    
    
    private _state: string;
    public jwPlayerComponent: JWPlayerComponent;
    private _notificationsComponent: NotificationsComponent;
    private get _jwPlayerNativeElement(): HTMLElement {
        return this._nativeElement.querySelector(".jw-player") as HTMLElement;
    }
    private get _notificationsNativeElement(): HTMLElement {
        return this._nativeElement.querySelector(".jw-player-notifications") as HTMLElement;
    }
}