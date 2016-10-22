import { JWPlayerComponent } from "./jw-player.component";
import { Analytics } from "./analytics";
import { State } from "./state";

export const bootstrap = (rootElement: HTMLElement) => {    
    let analytics = new Analytics();
    let state = new State();

    document.addEventListener('playerEvent', function (event: any) {
        // add more consumers to plater event here...
        analytics.onPlayerEvent(event);
        state.onPlayerEvent(event);
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