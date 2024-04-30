import { IpcMainInvokeEvent } from "electron";

export { activeUserHandler };

function activeUserHandler(_event: IpcMainInvokeEvent, data: string) {
    return activeUser(data);
}

function activeUser(data: string) : string {
    return "Returning response from activeUser use case: " + data;
}
