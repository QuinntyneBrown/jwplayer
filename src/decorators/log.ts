import { environment } from "../environment";

export function Log() {
    return (target, propertyKey, descriptor) => {
        var originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (environment.isDebug) {
                console.log("Log something interesting....");
            }
            return originalMethod.apply(this, args);
        }
        return descriptor;
    }

}