import { JWPlayerComponent } from "./components";
import { LocalStorageService } from "./services";
import { environment } from "./environment";

declare var jwplayer;

export const bootstrap = (root: HTMLElement, key: string, localStorageKey, isDebug = false) => {         
    jwplayer.key = key;       
    LocalStorageService.key = localStorageKey;
    environment.isDebug = isDebug;
    const elements: NodeList = root.querySelectorAll('div[jw-player]');    
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i] as HTMLElement;
        element.innerHTML = require("./templates/jw-player.html");        
        let jwPlayerComponent = new JWPlayerComponent(element, jwplayer(element.querySelector(".jw-player")), LocalStorageService.Instance, element.getAttribute("[height]"), element.getAttribute("[width]"), JSON.parse(element.getAttribute("[playlist]")),i);                
    }
}


