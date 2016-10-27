import 'core-js/es6';
import 'reflect-metadata';

import { JWPlayerHandlerComponent } from "./components";
import { Store } from "./services";
import { environment } from "./environment";

declare var jwplayer;

export const bootstrap = (root: HTMLElement, key: string, storeKey, isDebug = false) => {         
    jwplayer.key = key;   
    environment.isDebug = isDebug;
    const elements: NodeList = root.querySelectorAll('div[jw-player]');    
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i] as HTMLElement;        
        element.innerHTML = Reflect.getMetadata("template", JWPlayerHandlerComponent, undefined);        
        
        var inputs: Array<string> = Reflect.getMetadata("bindingPropertyNames", JWPlayerHandlerComponent, undefined);
        
        let jwPlayerHandlerComponent = new JWPlayerHandlerComponent(element, jwplayer(element.querySelector(".jw-player")), new Store(`${storeKey}-${i}`), JSON.parse(element.getAttribute("[playlist]")));                
        
        inputs.forEach(input => { jwPlayerHandlerComponent[input] = element.getAttribute(`[${input}]`) });

        jwPlayerHandlerComponent.activate();
    }
}


