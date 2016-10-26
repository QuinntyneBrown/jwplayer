import { environment } from "../environment";

export function Input() {
    return (target, propertyKey) => {
        var inputs = Reflect.getOwnMetadata("bindingProperties", target.constructor, undefined);
        if (inputs == null) {
            inputs = [propertyKey];
        } else {
            inputs.push(propertyKey);
        }         
        Reflect.defineMetadata("bindingProperties", inputs, target.constructor, undefined);
    }
}