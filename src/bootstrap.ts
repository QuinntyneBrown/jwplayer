import { JWPlayerComponent } from "./jw-player.component";
import { LocalStorageService } from "./local-storage-service";
import { Analytics } from "./analytics";

export const bootstrap = (rootElement: HTMLElement) => {    
    let analytics = new Analytics();

    document.addEventListener('playerEvent', function (event: any) {
        switch (event.playerEventType) {
            case "time":
                LocalStorageService.Instance.put({ name: "player position", value: event.playerEvent.position });
                break;

            case "ready":
                event.playerInstance.seek(LocalStorageService.Instance.get({ name: "player position" }));
                break;
        }
    });

    var jwPlayerElements:NodeList = rootElement.querySelectorAll('div[jw-player]');
    var jwPlayers: Array<JWPlayerComponent> = [];
    for (var i = 0; i < jwPlayerElements.length; i++) {
        var element = jwPlayerElements[i] as HTMLElement;
        let jwPlayerComponent = new JWPlayerComponent(element);
        jwPlayerComponent.file = element.getAttribute("[file]");
        jwPlayerComponent.height = element.getAttribute("[height]");
        jwPlayerComponent.width = element.getAttribute("[width]");
        jwPlayerComponent.activate();
    }

}