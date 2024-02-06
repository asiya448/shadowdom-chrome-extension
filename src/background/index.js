import { runtime, storage } from 'webextension-polyfill'

async function storeData(data) {
    storage.local.set({ data });
}

export async function init() {
    await storage.local.clear();

    runtime.onMessage.addListener(async (message) => {
        if (message.to === 'background') {
              return storeData(message.message);
        }
    })
}

runtime.onInstalled.addListener(() => {
    init().then(() => {
        console.log('[background] loaded ')
    })
})
