import { Notice, Vault } from 'obsidian';

export async function saveBase64ImageAndInsert(
    vault: Vault,
    imageBase64: string,
    editor: any
): Promise<string | null> {
    try {
        // Generate filename with timestamp
        const timestamp = generateTimestamp();
        const filename = `illustration-${timestamp}.png`;

        // Convert base64 to bytes and save in the vault
        const imageBytes = Uint8Array.from(atob(imageBase64), c => c.charCodeAt(0));
        await vault.createBinary(filename, imageBytes);

        // Insert the image markdown at the beginning of the selected text
        const imageMarkdown = `![[${filename}#left|300]]`;
        const cursor = editor.getCursor();
        editor.replaceRange(imageMarkdown, cursor, cursor);
        return filename;
    } catch (error) {
        console.error('Error handling image:', error);
        new Notice('Failed to save and insert the illustration. Please try again.');
        return null;
    }
}

export function generateTimestamp(): string {
    const now = new Date();
    return now.toISOString()
        .replace(/[:.]/g, '-')
        .replace('T', '-')
        .slice(0, 19);
}