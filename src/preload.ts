// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { IPCChannel } from './channels'

import { contextBridge, ipcRenderer } from 'electron'

declare global {
    interface Window {
        api: {
            invoke: (channel: IPCChannel, data?: any) => Promise<any>
        },
    }
}

// Expose protected methods that allow the renderer process to use
const allowedChannels: IPCChannel[] = [ 
    IPCChannel.GET_USER_DATA,
];

contextBridge.exposeInMainWorld(
    "api", {
        invoke: (channel: IPCChannel, data?: any): Promise<any> => {
            if (allowedChannels.includes(channel)) {
                return ipcRenderer.invoke(channel.toString(), data); 
            }
        }
    }
);
