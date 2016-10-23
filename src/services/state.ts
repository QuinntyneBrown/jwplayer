import { LocalStorageService } from "./local-storage-service";
import { PLAYER_POSITION } from "../constants";

export class State {

    public static onPlayerEvent(event) {
        switch (event.playerEventType) {
            case "time":
                LocalStorageService.Instance.put({ name: PLAYER_POSITION, value: event.playerEvent.position });
                break;

            case "ready":
                event.playerInstance.seek(LocalStorageService.Instance.get({ name: PLAYER_POSITION }));
                break;

            case "complete":
                LocalStorageService.Instance.clear();
                break;

            case "buffer":
                
                break;
        }
    }
}