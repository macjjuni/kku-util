async function copyToClipboard(txt: string | number) {
    try {
        await navigator.clipboard.writeText(txt.toString());
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}


export default {copyToClipboard};
