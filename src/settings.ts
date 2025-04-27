export interface BeautifulIllustrationsSettings {
    openaiApiKey: string;
    customPrompt: string;
}

export const DEFAULT_SETTINGS: BeautifulIllustrationsSettings = {
    openaiApiKey: '',
    customPrompt: 'Create a beautiful illustration based on the text below. Use a minimalist style with clean, sketchy lines in white on a transparent background. PNG FILE. The illustration should be elegant and simple, focusing on the key elements of the text while maintaining a cohesive and artistic composition. Avoid complex details and keep the design balanced and visually appealing.'
}; 