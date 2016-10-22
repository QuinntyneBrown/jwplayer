export class NotificationsComponent {
    constructor(private _element: HTMLElement) { }
    
    public set message(value: string) {
        this._element.innerText = value;
    }
    
}