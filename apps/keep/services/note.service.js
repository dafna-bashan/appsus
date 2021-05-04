'use strict';

import { storageService } from '../services/storage-service.js';

const KEY = 'notes';
var gNotes;


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

function createNote(type, isPinned, info) {
    switch (type) {
        case 'NoteText':
            return {
                type: 'NoteText',
                isPinned: false,
                info
            }
    }
}

var notes = [{
        type: "NoteText",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        type: "NoteImg",
        info: {
            url: "http://some-img/me",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        type: "NoteTodos",
        info: {
            label: "How was it:",
            todos: [
                { txt: "Do that", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ]
        }
    }
];