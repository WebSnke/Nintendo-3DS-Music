document.addEventListener('DOMContentLoaded', function () {
    let selectedOption = {};
    let volumeSlider = document.getElementById('volume-slider');
    let settingsSelect = document.getElementById('settings-select');
    let shoppingSelect = document.getElementById('shopping-select');

    browser.storage.local.get('volumeValue').then(function (result) {
        if (result.volumeValue) {
            volumeSlider.value = result.volumeValue;
        }
    });

    browser.storage.local.get('selectedOptions').then(function (result) {
        if (result.selectedOptions) {
            selectedOption = result.selectedOptions;
            settingsSelect.value = selectedOption.settingsAudio;
            shoppingSelect.value = selectedOption.shoppingAudio;
        }
    });

    volumeSlider.addEventListener('input', function () {
        let volumeValue = volumeSlider.value;
        browser.storage.local.set({ volumeValue: volumeValue });
        browser.runtime.sendMessage({ type: 'updateVolume', volume: volumeValue });
    });

    settingsSelect.addEventListener('change', function () {
        selectedOption.settingsAudio = settingsSelect.options[settingsSelect.selectedIndex].value;
        browser.storage.local.set({ selectedOptions: selectedOption });
        browser.runtime.sendMessage({ type: 'updateSettingsAudio', source: selectedOption.settingsAudio });
    });

    shoppingSelect.addEventListener('change', function () {
        selectedOption.shoppingAudio = shoppingSelect.options[shoppingSelect.selectedIndex].value;
        browser.storage.local.set({ selectedOptions: selectedOption });
        browser.runtime.sendMessage({ type: 'updateShoppingAudio', source: selectedOption.shoppingAudio });
    });
});