const Evernote = require('evernote');
const vscode = require('vscode');
const MAX_NOTE_COUNTS = 40;

//TODO: add some friendly msg.
class EvernoteClient {
    constructor(token, noteStoreUrl) {
        if (!token) {
            vscode.window.showWarningMessage('missing token in configuration');
        }
        const options = {
            token
        };
        const client = new Evernote.Client(options);
        this.noteStore = client.getNoteStore(noteStoreUrl);
    }
    listNotebooks() {
        return this.noteStore.listNotebooks();
    }

    listAllNoteMetadatas(notebookGuid) {
        return this.noteStore.findNotesMetadata(
            {notebookGuid}, 0, MAX_NOTE_COUNTS, {includeTitle: true, includeNotebookGuid: true, includeTagGuids: true}
        )
    }

    getNoteContent(noteGuid) {
        return this.noteStore.getNoteContent(noteGuid);
    }

    updateNoteContent(guid, title, content) {
        return this.noteStore.updateNote({guid, title, content});
    }

    createNotebook(title) {
        return this.noteStore.createNotebook({name: title});
    }

    createNote(title, notebookGuid, content) {
        return this.noteStore.createNote({title, notebookGuid, content});
    }

    // list all tags, and store it in local. guid -> name (hash by guid)
    listTags() {
        return this.noteStore.listTags();
    }
}
module.exports = EvernoteClient