// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { IPCHandler, ipcHandler } from './channels'

import { contextBridge, ipcRenderer } from 'electron'

declare global {
    interface Window {
        api: {
            invoke: IPCHandler
        },
    }
}

contextBridge.exposeInMainWorld(
    "api", {
        invoke: ipcHandler(ipcRenderer)
    }
);
