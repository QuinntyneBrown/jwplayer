import { JWPlayerComponent } from "./components";

declare var jwplayer;

export const bootstrap = (root: HTMLElement, key: string, handlers = []) => {         
    jwplayer.key = key;       

    const jwPlayerElements: NodeList = root.querySelectorAll('div[jw-player]');
    
    for (var i = 0; i < jwPlayerElements.length; i++) {
        var element = jwPlayerElements[i] as HTMLElement;
        let jwPlayerComponent = new JWPlayerComponent(element);
        jwPlayerComponent.file = element.getAttribute("[file]");
        jwPlayerComponent.height = element.getAttribute("[height]");
        jwPlayerComponent.width = element.getAttribute("[width]");
        jwPlayerComponent.index = i;
        jwPlayerComponent.activate();        
    }
}