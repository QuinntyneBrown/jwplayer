import { JWPlayerComponent } from "./jw-player.component";
import { NotificationsComponent } from "./notifications.component";

export class JWPlayerContainerComponent {
    constructor(private _nativeElement: HTMLElement) { }
    public title: string;
    public file: string;
    public height: string;
    public width: string;

    public activate() {
        var playerElement = document.createElement("div");
        playerElement.setAttribute("class", "jw-player-component");
        this._nativeElement.appendChild(playerElement);
        this._jwPlayerComponent = new JWPlayerComponent(this._nativeElement.firstChild as HTMLElement);
        this._jwPlayerComponent.file = this.file;
        this._jwPlayerComponent.height = this.height;
        this._jwPlayerComponent.width = this.width;

        var notificationsElement = document.createElement("div");
        notificationsElement.setAttribute("class", "notifications-component");
        this._nativeElement.appendChild(notificationsElement);
        
        this._notificationsComponent = new NotificationsComponent(this._nativeElement.querySelector(".notifications-component") as HTMLElement, this._jwPlayerComponent.playerInstance);
        this._jwPlayerComponent.activate();
        this._notificationsComponent.activate();
    }

    private _jwPlayerComponent: JWPlayerComponent;
    private _notificationsComponent: NotificationsComponent;
}