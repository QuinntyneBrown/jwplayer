export class NotificationsComponent {
    constructor(private _element: HTMLElement) { }
    
    public message(value: string) {
        this._element.innerText = value;
    }
}