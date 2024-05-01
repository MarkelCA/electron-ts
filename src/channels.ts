import {activeUserHandler} from './modules/activeuser';

export enum IPCChannel {
    GET_USER_DATA,
    ANOTHER_USE_CASE,
}

interface IPCRouter {
    [key: string]: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any;
}

const ipcRouter: IPCRouter = {
    [IPCChannel.GET_USER_DATA]: activeUserHandler
};

export function initializeHandlers(ipcMain: Electron.IpcMain) {
    Object.keys(ipcRouter).forEach((key) => {
        ipcMain.handle(key, ipcRouter[key]);
    });
}

export type IPCHandler = (channel: IPCChannel, data?: any) => Promise<any>;

// Expose protected methods that allow the renderer process to use
const allowedChannels: IPCChannel[] = [ 
    IPCChannel.GET_USER_DATA,
];

export function ipcHandler(ipcRenderer: Electron.IpcRenderer): IPCHandler {
    return function (channel: IPCChannel, data?: any): Promise<any> {
        if (allowedChannels.includes(channel)) {
            return ipcRenderer.invoke(channel.toString(), data);
        } else {
            return Promise.reject(`Channel ${channel} is not allowed`);
        }
    }
}
