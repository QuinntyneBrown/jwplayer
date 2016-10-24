export class NotificationsComponent {
    constructor(private _element: any) { }
    
    public set message(value: string) {
        this._element.innerText = value;
    }
    
}