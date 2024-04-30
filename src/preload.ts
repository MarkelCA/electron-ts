// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron'

declare global {
    interface Window {
        api: {
            invoke: (channel: string, data?: any) => Promise<any>
        }
    }
}


// Expose protected methods that allow the renderer process to use
const allowedChannels: string[] = ["get-user-data"]; 

contextBridge.exposeInMainWorld(
    "api", {
        invoke: (channel: string, data?: any) => {
            if (allowedChannels.includes(channel)) {
                return ipcRenderer.invoke(channel, data); 
            }
        },
    }
);

