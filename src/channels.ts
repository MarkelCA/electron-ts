import {activeUserHandler} from './modules/activeuser';

export enum IPCChannel {
    GET_USER_DATA,
    ANOTHER_USE_CASE,
}


// IPC Router
// Routes the IPC calls to the appropriate handler based on the channel name
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
