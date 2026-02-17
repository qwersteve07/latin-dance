export function isValidUrl(value: string) {
    try {
        new URL(value);
        return true;
    } catch (e: any) { //eslint-disable-line
        return false;
    }

}
