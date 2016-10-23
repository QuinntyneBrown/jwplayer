import { JWPlayerContainerComponent } from "./components";
import { Analytics, State, ErrorHandler, EventHub } from "./services";

declare var jwplayer;

EventHub.Instance.addEventHandler(Analytics);
EventHub.Instance.addEventHandler(State);
EventHub.Instance.addEventHandler(ErrorHandler);

export const bootstrap = (rootElement: HTMLElement, key: string) => {         
    jwplayer.key = key;       

    const jwPlayerElements:NodeList = rootElement.querySelectorAll('div[jw-player]');
    
    for (var i = 0; i < jwPlayerElements.length; i++) {
        var element = jwPlayerElements[i] as HTMLElement;
        let jwPlayerContainerComponent = new JWPlayerContainerComponent(element);
        jwPlayerContainerComponent.file = element.getAttribute("[file]");
        jwPlayerContainerComponent.height = element.getAttribute("[height]");
        jwPlayerContainerComponent.width = element.getAttribute("[width]");
        jwPlayerContainerComponent.index = i;
        jwPlayerContainerComponent.activate();
        
        EventHub.Instance.addJWPlayer(JWPlayerContainerComponent);        
    }

}