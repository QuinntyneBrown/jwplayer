require("reflect-metadata");

export function Component(config: any = {}) {
    return function (cls) {
        for (var prop in config) {
                Reflect.defineMetadata(prop, config[prop], cls, undefined);
        }        
    };
}