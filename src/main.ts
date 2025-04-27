import { App, Plugin, PluginManifest } from 'obsidian';

export default class BeautifulIllustrationsPlugin extends Plugin {
    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
    }

    async onload() {
        console.log('Loading Beautiful Illustrations plugin');

        // Add a ribbon icon
        this.addRibbonIcon('image', 'Add Illustration', () => {
            // This will be implemented later
            console.log('Add illustration clicked');
        });
    }

    onunload() {
        console.log('Unloading Beautiful Illustrations plugin');
    }
} 