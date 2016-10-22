import { JWPlayerContainerComponent } from "./components";
import { Analytics, State, ErrorHandler } from "./services";

declare var jwplayer;

export const bootstrap = (rootElement: HTMLElement, key: string) => {         
    jwplayer.key = key;       
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
        let jwPlayerContainerComponent = new JWPlayerContainerComponent(element);
        jwPlayerContainerComponent.file = element.getAttribute("[file]");
        jwPlayerContainerComponent.height = element.getAttribute("[height]");
        jwPlayerContainerComponent.width = element.getAttribute("[width]");
        jwPlayerContainerComponent.activate();
    }

}