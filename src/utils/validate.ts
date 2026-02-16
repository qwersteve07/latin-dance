export function isValidUrl(value: string) {
    try {
        // Attempt to create a new URL object
        new URL(value);
        return true;
    } catch (e: any) {
        return false;
    }

}
