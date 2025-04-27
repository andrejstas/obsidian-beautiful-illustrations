import { App, PluginSettingTab, Setting } from 'obsidian';
import BeautifulIllustrationsPlugin from './main';
import { BeautifulIllustrationsSettings } from './settings';

export class BeautifulIllustrationsSettingTab extends PluginSettingTab {
    plugin: BeautifulIllustrationsPlugin;

    constructor(app: App, plugin: BeautifulIllustrationsPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'Beautiful Illustrations Settings' });

        new Setting(containerEl)
            .setName('OpenAI API Key')
            .setDesc('Enter your OpenAI API key to generate illustrations')
            .addText(text => text
                .setPlaceholder('Enter your API key')
                .setValue(this.plugin.settings.openaiApiKey)
                .onChange(async (value) => {
                    this.plugin.settings.openaiApiKey = value;
                    await this.plugin.saveSettings();
                }));
    }
} 