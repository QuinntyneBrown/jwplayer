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
        let element = elements[i] as HTMLElement;        
        element.innerHTML = Reflect.getMetadata("template", JWPlayerHandlerComponent, undefined);        
        
        let jwPlayerHandlerComponent = new JWPlayerHandlerComponent(element, new Store(`${storeKey}-${i}`));                
        
        let inputs = Reflect.getMetadata("bindingPropertyNames", JWPlayerHandlerComponent, undefined)

        for (var x = 0; x < inputs.length; x++) {
            if (inputs[x] == "playlist") {
                jwPlayerHandlerComponent[inputs[x]] = JSON.parse(element.getAttribute(`[${inputs[x]}]`));
            }
            else {
                jwPlayerHandlerComponent[inputs[x]] = element.getAttribute(`[${inputs[x]}]`);
            } 
        }        
        jwPlayerHandlerComponent.activate();
    }
}


