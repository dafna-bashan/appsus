const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

export class KeepApp extends React.Component {
    state = {
        notes: null,
        filterBy: null,
        selectedNote: null

    }
    componentDidMount() {
        loadNotes();
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

    setSelectedNote = (note) => {
        this.setState({ selectedNote: note })
    }


    render() {
        // console.log('RENDER!', this.state.books);
        const { notes} = this.state
        if (!notes) return <div>Loading...</div>
        return (
            <div>
                <section className="container">
                    {!selectedNote && <React.Fragment>
                        <NoteFilter onSetFilter={this.onSetFilter} />
                        <NoteList notes={notes} setSelectedNote={this.setSelectedNote} />
                    </React.Fragment>}
                    {selectedNote &&
                        <NoteDetails note={selectedNote} goBack={() => this.setSelectedNote(null)} />}
                </section>
            </div>
        )
    }
}