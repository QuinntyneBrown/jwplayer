import { JWPlayerContainerComponent } from "./components";
import { Analytics, ErrorHandler, EventHub } from "./services";

declare var jwplayer;

export const bootstrap = (rootElement: HTMLElement, key: string, handlers = []) => {         
    jwplayer.key = key;       

    EventHub.Instance.addEventHandlers([Analytics, ErrorHandler,...handlers]);

    const jwPlayerElements: NodeList = rootElement.querySelectorAll('div[jw-player]');
    
    for (var i = 0; i < jwPlayerElements.length; i++) {
        var element = jwPlayerElements[i] as HTMLElement;
        let jwPlayerContainerComponent = new JWPlayerContainerComponent(element);
        jwPlayerContainerComponent.file = element.getAttribute("[file]");
        jwPlayerContainerComponent.height = element.getAttribute("[height]");
        jwPlayerContainerComponent.width = element.getAttribute("[width]");
        jwPlayerContainerComponent.index = i;
        jwPlayerContainerComponent.activate();
        
        EventHub.Instance.addJWPlayer(jwPlayerContainerComponent);        
    }

}