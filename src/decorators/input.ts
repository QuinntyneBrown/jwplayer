import { environment } from "../environment";

export function Input(bindingPropertyName?: string) {
    return (target, propertyKey) => {
        var inputs = Reflect.getOwnMetadata("bindingPropertyNames", target.constructor, undefined);
        if (inputs == null) {
            inputs = [bindingPropertyName || propertyKey];
        } else {
            inputs.push(bindingPropertyName || propertyKey);
        }         
        Reflect.defineMetadata("bindingPropertyNames", inputs, target.constructor, undefined);
    }
}