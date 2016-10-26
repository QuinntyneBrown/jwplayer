import { environment } from "../environment";

export function Input() {
    return (target, propertyKey, descriptor) => {
        var originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            return originalMethod.apply(this, args);
        }
        return descriptor;
    }

}