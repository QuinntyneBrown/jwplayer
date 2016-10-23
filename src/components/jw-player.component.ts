declare var jwplayer: any;

export class JWPlayerComponent {
    constructor(
        private _nativeElement: HTMLElement
    ) { }
    
    public file: string;
    public height: string;
    public width: string;    
    private _playerInstance: any = null;

    public get playerInstance(): any {
        this._playerInstance = this._playerInstance || jwplayer(this._nativeElement);
        return this._playerInstance;
    }

    public activate() {
        this.playerInstance.setup({
            file: this.file,
            height: this.height,
            width: this.width,
            setFullScreen: true,
            events: this.events
        });        
    }

    public events: any;

    public seek = position => this.playerInstance.seek(position);
}