import { JWPlayerComponent } from "./jw-player.component";
import { NotificationsComponent } from "./notifications.component";

export class JWPlayerContainerComponent {
    constructor(private _nativeElement: HTMLElement) { }
    public title: string;
    public file: string;
    public height: string;
    public width: string;

    public activate() {
        this._nativeElement.innerHTML = require("../templates/jw-player-container.html");        
        this._jwPlayerComponent = new JWPlayerComponent(this._jwPlayerNativeElement);
        this._jwPlayerComponent.file = this.file;
        this._jwPlayerComponent.height = this.height;
        this._jwPlayerComponent.width = this.width;        
        this._notificationsComponent = new NotificationsComponent(this._notificationsNativeElement);
        this._jwPlayerComponent.activate();
    }

    private _jwPlayerComponent: JWPlayerComponent;
    private _notificationsComponent: NotificationsComponent;
    private get _jwPlayerNativeElement(): HTMLElement {
        return this._nativeElement.querySelector(".jw-player") as HTMLElement;
    }
    private get _notificationsNativeElement(): HTMLElement {
        return this._nativeElement.querySelector(".jw-player-notifications") as HTMLElement;
    }
}