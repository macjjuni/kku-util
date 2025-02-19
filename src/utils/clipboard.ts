async function copyToClipboard(txt: string | number) {
    try {
        await navigator.clipboard.writeText(txt.toString());
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function pasteFromClipboard() {
    try {
        return await navigator.clipboard.readText();
    } catch (e) {
        console.error(e);
        return "";
    }
}

export default {copyToClipboard, pasteFromClipboard};
