import { JWPlayerComponent } from "./jw-player.component";

export const bootstrap = (rootElement: HTMLElement) => {
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