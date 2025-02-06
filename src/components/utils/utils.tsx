export const getRoute = (defaultRoute: string): string => {
    if (getItemSessionStorage('previousPath') && getItemSessionStorage('currentPath') && getItemSessionStorage('previousPath') != getItemSessionStorage('currentPath')) {
        return String(getItemSessionStorage('previousPath'));
    } else {
        return defaultRoute;
    }
}

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
