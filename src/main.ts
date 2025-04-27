import { App, Plugin, PluginManifest, Menu, Editor, Notice } from 'obsidian';
import { BeautifulIllustrationsSettingTab } from './settings-tab';
import { BeautifulIllustrationsSettings, DEFAULT_SETTINGS } from './settings';
import { generateIllustration } from './utils';
import { saveBase64ImageAndInsert } from './image-handler';
import { connect } from 'http2';

export default class BeautifulIllustrationsPlugin extends Plugin {
    settings: BeautifulIllustrationsSettings;

    constructor(app: App, manifest: PluginManifest) {
        super(app, manifest);
    }

    async onload() {
        console.log('Loading Beautiful Illustrations plugin');

        // Load settings
        await this.loadSettings();

        // Add settings tab
        this.addSettingTab(new BeautifulIllustrationsSettingTab(this.app, this));

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
                                const notice = new Notice('Generating illustration...', 0);

                                console.log('this.settings.openaiApiKey', this.settings.openaiApiKey)
                                console.log('this.settings.customPrompt', this.settings.customPrompt)
                                console.log('selection', selection)


                                try {
                                    const result = await generateIllustration(
                                        this.settings.openaiApiKey,
                                        this.settings.customPrompt,
                                        selection,
                                        (message) => notice.setMessage(message)
                                    );



                                    if (result) {
                                        await saveBase64ImageAndInsert(
                                            this.app.vault,
                                            result.imageBase64,
                                            editor
                                        );
                                        notice.setMessage('Illustration created successfully!');
                                        setTimeout(() => notice.hide(), 2000);
                                    }
                                } catch (error) {
                                    console.error('Error in illustration creation:', error);
                                    notice.setMessage('Failed to create illustration. Please try again.');
                                    setTimeout(() => notice.hide(), 5000);
                                }
                            });
                    });
                }
            })
        );
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    onunload() {
        console.log('Unloading Beautiful Illustrations plugin');
    }
} 