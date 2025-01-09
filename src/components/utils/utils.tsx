import { Item } from "@radix-ui/react-dropdown-menu";

export function getItemSessionStorage<T> (name: string): T | null {
    const jsonValue = sessionStorage.getItem(name);

    if (jsonValue) {
        return JSON.parse(jsonValue) as T;
    }

    return null;
}

export function setItemSessionStorage<T>(name: string, value: T): void {
    sessionStorage.setItem(name, JSON.stringify(value));
}