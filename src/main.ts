import { App, Plugin, PluginManifest, Menu, Editor } from 'obsidian';

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

        // Register the context menu
        this.registerEvent(
            this.app.workspace.on('editor-menu', (menu: Menu, editor: Editor) => {
                const selection = editor.getSelection();
                if (selection) {
                    menu.addItem((item) => {
                        item
                            .setTitle('Create illustration')
                            .setIcon('image')
                            .onClick(async () => {
                                // Here we'll implement the illustration creation logic
                                console.log('Creating illustration from text:', selection);
                            });
                    });
                }
            })
        );
    }

    onunload() {
        console.log('Unloading Beautiful Illustrations plugin');
    }
} 