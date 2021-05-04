'use strict';

import { storageService } from '../../../services/storage-service.js';
import { utilService } from '../../../services/util-service.js';

export const noteService = {
    query,
    getNoteById,
    createNote,
}

const KEY = 'notes';
var gNotes;
_createNotes();

function query(filterBy) {
    if (filterBy) {
        var { title } = filterBy
        const filtereNotes = gNotes.filter(note => {
            return note.title.includes(title);
        })
        return Promise.resolve(filtereNotes);
    }
    return Promise.resolve(gNotes);
}


function getNoteById(noteId) {
    var note = gNotes.find(function(note) {
        return noteId === note.id;
    })
    return Promise.resolve(note);
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}

function createNote(type, isPinned, info, style) {
    return {
        id: utilService.makeId(),
        type,
        isPinned,
        info,
        style
    }

}

function _createNotes() {
    var notes = [{
            id: utilService.makeId(),
            type: "NoteTxt",
            isPinned: true,
            title: 'title',
            info: {
                txt: "Fullstack Me Baby!"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        // {
        //     type: "NoteImg",
        //     isPinned: true,
        //     title: "Me playing Mi",
        //     info: {
        //         url: "http://some-img/me",

        //     },
        //     style: {
        //         backgroundColor: "#00d"
        //     }
        // },
        {
            id: utilService.makeId(),
            type: "NoteTodos",
            isPinned: true,
            title: "Me playing Mi",
            info: {
                label: "How was it:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ]
            },
            style: {
                backgroundColor: "#00d"
            }
        }
    ];

    gNotes = notes;
    _saveNotesToStorage();
}