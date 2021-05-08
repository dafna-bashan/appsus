const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM
import { noteService } from '../services/note.service.js'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteEdit } from '../cmps/NoteEdit.jsx'

export class KeepApp extends React.Component {
    state = {
        notes: null,
        filterBy: null,
    }

    componentDidMount() {
        this.loadNotes();
    }

    loadNotes() {
        noteService.query(this.state.filterBy).then((notes) => {
            console.log(notes);
            this.setState({ notes })
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
    }

    onToggleStyle = (id) => {
        noteService.toggleStyle(id);
        this.loadNotes();
    }

    onChangeColor = (id, color) => {
        noteService.changeColor(id, color)
        noteService.toggleStyle(id);
        this.loadNotes();
    }

    getColorClass = (color) => {
        console.log(color);
        switch (color) {
            case '#7C838A': return 'blue';
            case '#E6F3FF': return 'light-blue';
            case '#B0BAC3': return 'grey';
            case '#F2CB05': return 'yellow';
            case '#e3e6e9': return 'light-grey';
        }
    }

    onAddNote = () => {
        this.loadNotes();
    }

    onRemoveNote = (id) => {
        noteService.removeNote(id);
        this.loadNotes();
    }

    onPinNote = (note) => {
        noteService.togglePinNote(note);
        this.loadNotes();
    }

    onEditNote = (isEditing) => {
        this.setState({ isEditing })
    }

    render() {
        // console.log('RENDER!', this.state.books);
        const { notes } = this.state
        console.log(notes);
        if (!notes) return <div>Loading...</div>
        return (
            <div>
                <section className="keep-app container">
                    <NoteFilter onSetFilter={this.onSetFilter} />
                    <NoteAdd onAddNote={this.onAddNote} />

                    {/* <NoteFilter onSetFilter={this.onSetFilter} /> */}
                    <NoteList notes={notes} onRemoveNote={this.onRemoveNote}
                        onPinNote={this.onPinNote} onEditNote={this.onEditNote}
                        onToggleStyle={this.onToggleStyle} onChangeColor={this.onChangeColor}
                        getColorClass={this.getColorClass} />
                </section>
            </div>
        )
    }
}