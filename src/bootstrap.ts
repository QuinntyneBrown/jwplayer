import { JWPlayerInstanceHandlerComponent } from "./components";
import { Store } from "./services";
import { environment } from "./environment";

declare var jwplayer;

export const bootstrap = (root: HTMLElement, key: string, storeKey, isDebug = false) => {         
    jwplayer.key = key;       
    Store.key = storeKey;
    environment.isDebug = isDebug;
    const elements: NodeList = root.querySelectorAll('div[jw-player]');    
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i] as HTMLElement;
        element.innerHTML = Reflect.getMetadata("template", JWPlayerInstanceHandlerComponent, undefined);        
        let jwPlayerInstanceHandlerComponent = new JWPlayerInstanceHandlerComponent(element, jwplayer(element.querySelector(".jw-player")), Store.Instance, element.getAttribute("[height]"), element.getAttribute("[width]"), JSON.parse(element.getAttribute("[playlist]")),i);                
    }
}


