import { LocalStorageService } from "./local-storage-service";

export class State {

    public static onPlayerEvent(event) {
        switch (event.playerEventType) {
            case "time":
                LocalStorageService.Instance.put({ name: "player position", value: event.playerEvent.position });
                break;

            case "ready":
                event.playerInstance.seek(LocalStorageService.Instance.get({ name: "player position" }));
                break;

            case "complete":
                LocalStorageService.Instance.clear();
                break;

            case "buffer":
                
                break;
        }
    }
}