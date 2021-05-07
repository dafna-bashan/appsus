'use strict';

import { storageService } from '../../../services/storage-service.js';
import { utilService } from '../../../services/util-service.js';

export const noteService = {
    query,
    getNoteById,
    createNote,
    removeNote,
    togglePinNote,
    saveNote,
    removeTodo,
    toggleDone
}

const KEY = 'notes';
var gNotes;

_createNotes();

function query(filterBy) {
    if (filterBy) {
        var { title } = filterBy
        const filtereNotes = gNotes.filter(note => {
            return note.title.toLowerCase().includes(title);
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
    storageService.saveToStorage(KEY, gNotes);
}

function togglePinNote(selectedNote) {
    const idx = gNotes.findIndex(note => note.id === selectedNote.id);
    if (selectedNote.isPinned === true) gNotes[idx].isPinned = false;
    else gNotes[idx].isPinned = true;
    console.log(selectedNote);
    _saveNotesToStorage();
}

function toggleDone(noteId, todoId) {
    if (!todoId || !noteId) return;
    const noteIdx = gNotes.findIndex(note => note.id === noteId);
    const todoIdx = gNotes[noteIdx].info.todos.findIndex(todo => todo.id === todoId);
    if (gNotes[noteIdx].info.todos[todoIdx].doneAt) gNotes[noteIdx].info.todos[todoIdx].doneAt = null;
    else gNotes[noteIdx].info.todos[todoIdx].doneAt = Date.now();
    _saveNotesToStorage();
    return Promise.resolve(gNotes[noteIdx]);
}

function removeNote(id) {
    // console.log(id);
    const idx = gNotes.findIndex(note => note.id === id);
    // console.log(idx);
    gNotes.splice(idx, 1);
    _saveNotesToStorage();
}

function removeTodo(noteId, todoId) {
    // console.log(id);
    const noteIdx = gNotes.findIndex(note => note.id === noteId);
    const todoIdx = gNotes[noteIdx].info.todos.findIndex(todo => todo.id === todoId);
    // console.log(idx);
    gNotes[noteIdx].info.todos.splice(todoIdx, 1);
    _saveNotesToStorage();
    return Promise.resolve(gNotes[noteIdx]);
}

function saveNote(noteToUpdate) {
    var noteIdx = gNotes.findIndex(note => {
        return note.id === noteToUpdate.id;
    })
    gNotes.splice(noteIdx, 1, noteToUpdate);
    _saveNotesToStorage();
    return Promise.resolve(noteToUpdate);
}

function createNote(state) {
    console.log(state);
    const { type, title, info, style } = state.note;
    const note = {
        id: utilService.makeId(),
        type,
        isPinned: false,
        title,
        info,
        style
    }
    gNotes.unshift(note);
    _saveNotesToStorage()
    return Promise.resolve();
}

function _createNotes() {
    var notes = storageService.loadFromStorage(KEY)
    if (!notes || !notes.length) {
        notes = [{
                id: utilService.makeId(),
                type: "NoteTxt",
                isPinned: true,
                title: 'Coding',
                info: {
                    txt: "I love coding!"
                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteImg",
                isPinned: true,
                title: "Art",
                info: {
                    url: "https://i.pinimg.com/564x/9a/b0/7b/9ab07b7ae73e44a806c468e6fd174149.jpg",

                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteVideo",
                isPinned: true,
                title: "Music",
                info: {
                    url: "https://www.youtube.com/embed/tgbNymZ7vqY",

                },
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteTodos",
                isPinned: true,
                title: "Todo",
                info: {
                    todos: [
                        { id: utilService.makeId(), txt: "Implement keep app", doneAt: null },
                        { id: utilService.makeId(), txt: "Implement mail app", doneAt: 187111111 },
                        { id: utilService.makeId(), txt: "Go to the beach!!!", doneAt: null }
                    ]
                },
                style: {
                    backgroundColor: "#00d"
                }
            }
        ];
    }

    gNotes = notes;
    _saveNotesToStorage();
}