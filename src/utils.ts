import { Notice } from 'obsidian';
import OpenAI from 'openai';

export function generateTimestamp(): string {
    const now = new Date();
    return now.toISOString()
        .replace(/[:.]/g, '-')
        .replace('T', '-')
        .slice(0, 19);
}

export function sanitizeText(text: string): string {
    // Remove markdown links and images
    text = text.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1');

    // Remove HTML tags
    text = text.replace(/<[^>]*>/g, '');

    // Remove multiple spaces and newlines
    text = text.replace(/\s+/g, ' ').trim();

    // Remove special characters that might cause issues
    text = text.replace(/[^\w\s.,!?-]/g, '');

    return text;
}

export async function generateIllustration(
    apiKey: string,
    customPrompt: string,
    selectedText: string,
    onProgress: (message: string) => void
): Promise<{ imageBase64: string; revisedPrompt: string } | null> {
    if (!apiKey) {
        new Notice('OpenAI API key is not set. Please configure it in the plugin settings.');
        return null;
    }

    try {
        const openai = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true
        });

        const sanitizedText = sanitizeText(selectedText);
        const fullPrompt = `${customPrompt}\n---\n${sanitizedText}`;

        onProgress('Generating illustration...');

        const response = await openai.images.generate({
            model: "gpt-image-1",
            prompt: fullPrompt,
            n: 1,
            size: "1024x1024",
        });

        if (!response.data || !response.data[0]?.b64_json) {
            throw new Error('No image data received from OpenAI');
        }

        return {
            imageBase64: response.data[0].b64_json,
            revisedPrompt: response.data[0].revised_prompt || fullPrompt
        };
    } catch (error) {
        console.error('Error generating illustration:', error);
        new Notice('Failed to generate illustration. Please check your API key and try again.');
        return null;
    }
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
} 