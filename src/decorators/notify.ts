export function Notify(jwplayereventname:string) {
    return (target, propertyKey, descriptor) => {
        var originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            var e = document.createEvent('Event');
            e.initEvent(`jw-${jwplayereventname}`, true, true);
            e["jwplayerinstance"] = target;
            e["jwplayerevent"] = args[0];
            e["jwplayereventname"] = jwplayereventname;
            document.dispatchEvent(e);            
            return originalMethod.apply(this, args);
        }

        return descriptor;
    }

}