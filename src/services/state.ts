import { LocalStorageService } from "./local-storage-service";
import { PLAYER_POSITION } from "../constants";

export class State {

    public static onPlayerEvent(event) {
        switch (event.playerEventType) {
            case "time":
                LocalStorageService.Instance.put({ name: `${PLAYER_POSITION}-${event.index}`, value: event.playerEvent.position });
                break;

            case "ready":
                event.playerInstance.seek(LocalStorageService.Instance.get({ name: `${PLAYER_POSITION}-${event.index}` }));
                break;

            case "complete":
                LocalStorageService.Instance.put({ name: `${PLAYER_POSITION}-${event.index}`, value: 0 });
                break;                
        }
    }
}