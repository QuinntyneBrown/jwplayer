import { JWPlayerComponent } from "./jw-player.component";
import { Analytics } from "./analytics";
import { State } from "./state";
import { ErrorHandler } from "./error-handler";

declare var jwplayer;

export const bootstrap = (rootElement: HTMLElement) => {     
    
    jwplayer.key = "RQ+gASdSAzcEhqeSCgQ7M7hHOXdBC1Jdsl+PWg==";
       
    document.addEventListener('playerEvent', function (event: any) {
        // add more built-in handlers to player event here...
        // Consumers of the player can add handlers by listening for the custom event
        Analytics.onPlayerEvent(event);
        State.onPlayerEvent(event);
        ErrorHandler.onPlayerEvent(event);
    });

    const jwPlayerElements:NodeList = rootElement.querySelectorAll('div[jw-player]');
    
    for (var i = 0; i < jwPlayerElements.length; i++) {
        var element = jwPlayerElements[i] as HTMLElement;
        let jwPlayerComponent = new JWPlayerComponent(element);
        jwPlayerComponent.file = element.getAttribute("[file]");
        jwPlayerComponent.height = element.getAttribute("[height]");
        jwPlayerComponent.width = element.getAttribute("[width]");
        jwPlayerComponent.activate();
    }

}