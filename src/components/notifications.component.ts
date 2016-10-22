export class NotificationsComponent {
    constructor(private _element: HTMLElement, private _playerInstance: any) { }

    public activate() {
        this._handleEventsFor(this._playerInstance);        
    }

    private _handleEventsFor = (playerInstance: any) => {
        this._playerInstance.on("buffer", () => {

        });

    }
}