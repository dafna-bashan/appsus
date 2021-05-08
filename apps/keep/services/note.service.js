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
    toggleDone,
    toggleStyle,
    changeColor
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

function findNoteIdx(id) {
    return gNotes.findIndex(note => note.id === id);
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes);
}

function togglePinNote(selectedNote) {
    const idx = findNoteIdx(selectedNote.id)
    if (selectedNote.isPinned === true) gNotes[idx].isPinned = false;
    else gNotes[idx].isPinned = true;
    console.log(selectedNote);
    _saveNotesToStorage();
}

function toggleDone(noteId, todoId) {
    if (!todoId || !noteId) return;
    const noteIdx = findNoteIdx(noteId);
    const todoIdx = gNotes[noteIdx].info.todos.findIndex(todo => todo.id === todoId);
    if (gNotes[noteIdx].info.todos[todoIdx].doneAt) gNotes[noteIdx].info.todos[todoIdx].doneAt = null;
    else gNotes[noteIdx].info.todos[todoIdx].doneAt = Date.now();
    _saveNotesToStorage();
    return Promise.resolve(gNotes[noteIdx]);
}

function toggleStyle(noteId) {
    const idx = gNotes.findIndex(note => note.id === noteId);
    gNotes[idx].style.isChanging = !gNotes[idx].style.isChanging;
    _saveNotesToStorage();
}

function changeColor(noteId, color) {
    console.log(noteId, color);
    const idx = findNoteIdx(noteId);
    gNotes[idx].style.backgroundColor = color;
    _saveNotesToStorage();
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
    const noteIdx = findNoteIdx(noteId);
    const todoIdx = gNotes[noteIdx].info.todos.findIndex(todo => todo.id === todoId);
    // console.log(idx);
    gNotes[noteIdx].info.todos.splice(todoIdx, 1);
    _saveNotesToStorage();
    return Promise.resolve(gNotes[noteIdx]);
}

function saveNote(noteToUpdate) {
    const noteIdx = findNoteIdx(noteToUpdate.id);
    gNotes.splice(noteIdx, 1, noteToUpdate);
    _saveNotesToStorage();
    return Promise.resolve(noteToUpdate);
}

function createNote(state) {
    console.log(state);
    const { type, title, info } = state.note;
    const note = {
        id: utilService.makeId(),
        type,
        isPinned: false,
        title,
        info,
        style: {
            isChanging: false,
            backgroundColor: '#e3e6e9'
        }
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
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteImg",
                isPinned: true,
                title: "Painting",
                info: {
                    url: "https://i.pinimg.com/564x/9a/b0/7b/9ab07b7ae73e44a806c468e6fd174149.jpg",

                },
                style: {
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
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
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
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
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteTxt",
                isPinned: true,
                title: 'Modern Art',
                info: {
                    txt: "InDesign are built on the vital element in a message. Of developers to be able to the message that applying. Task design an interface that dictates how we might soon be. Challenge no other updates the product or not interested in the senses. Apple throws at using the product or even tastes, good old pencil. Design single adaptive interface elements but I believe that appeals."
                },
                style: {
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteTodos",
                isPinned: true,
                title: "Groceries",
                info: {
                    todos: [
                        { id: utilService.makeId(), txt: "Apples", doneAt: null },
                        { id: utilService.makeId(), txt: "bananas", doneAt: 187111111 },
                        { id: utilService.makeId(), txt: "Oranges", doneAt: null }
                    ]
                },
                style: {
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteTxt",
                isPinned: true,
                title: 'Modern Art',
                info: {
                    txt: "That centuries been proposed, among them were part of modern art criticism his interests. Reflected to perform psychoanalysis is Laurie Schneider Adams, who gathered in this is. Served surveys of modern art history of the important modern painting."
                },
                style: {
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteTodos",
                isPinned: true,
                title: "Learn",
                info: {
                    todos: [
                        { id: utilService.makeId(), txt: "JavaScript", doneAt: 187111111 },
                        { id: utilService.makeId(), txt: "HTML", doneAt: 187111111 },
                        { id: utilService.makeId(), txt: "Css", doneAt: 187111111 },
                        { id: utilService.makeId(), txt: "React", doneAt: null }
                    ]
                },
                style: {
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteImg",
                isPinned: true,
                title: "Art",
                info: {
                    url: "https://i.pinimg.com/564x/30/ef/bb/30efbb5fb42c5d287198f8e35e64bf71.jpg",

                },
                style: {
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteTxt",
                isPinned: true,
                title: 'Coding',
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteVideo",
                isPinned: false,
                title: "Music",
                info: {
                    url: "https://www.youtube.com/embed/XXYlFuWEuKI",

                },
                style: {
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
                }
            },
            {
                id: utilService.makeId(),
                type: "NoteTxt",
                isPinned: false,
                title: 'Ideas',
                info: {
                    txt: "Treat was encouraging developers to do you want I didn't. Power, way Cupertino was the drawing board it on and aspect rat. Multi-Sensory as taking leading and typography the concept of. Fighting car industry excels at users, without going back. The and that most of whether we had the senses. All smells, feels, possibly even Windows and is that Twitter UI according. "
                },
                style: {
                    isChanging: false,
                    backgroundColor: '#e3e6e9'
                }
            }
        ];
    }

    gNotes = notes;
    _saveNotesToStorage();
}