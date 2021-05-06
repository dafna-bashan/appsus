const Router = ReactRouterDOM.HashRouter
const { Route, Switch, Link } = ReactRouterDOM
import { noteService } from '../services/note.service.js'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteAdd } from '../cmps/NoteAdd.jsx'

export class KeepApp extends React.Component {
    state = {
        notes: null,
        filterBy: null,
        // isAdding: false,
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

    // setIsAdding = (isAdding) => {
    //     this.setState({ isAdding })
    // }

    render() {
        // console.log('RENDER!', this.state.books);
        const { notes } = this.state
        console.log(notes);
        if (!notes) return <div>Loading...</div>
        return (
            <div>
                <section className="container">
                    <NoteFilter onSetFilter={this.onSetFilter} />
                    <NoteAdd onAddNote={this.onAddNote} />

                    {/* <NoteFilter onSetFilter={this.onSetFilter} /> */}
                    <NoteList notes={notes} onRemoveNote={this.onRemoveNote} onPinNote={this.onPinNote} />
                </section>
            </div>
        )
    }
}