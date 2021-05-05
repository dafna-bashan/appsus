import { noteService } from '../services/note.service.js'

export class NoteEdit extends React.Component {

  state = {
    note: {
      type: "NoteTxt",
      isPinned: false,
      title: '',
      info: {
        url: "https://i.pinimg.com/564x/9a/b0/7b/9ab07b7ae73e44a806c468e6fd174149.jpg",

      },
      style: {
        backgroundColor: "#00d"
      }
    }
  }

  componentDidMount() {
    const id = this.props.match.params.noteId
    if (!id) return
    noteService.getNoteById(id).then(note => {
      this.setState({ note })
    })
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    this.setState(prevState => ({
      note: {
        ...prevState.note,
        [field]: value
      }
    }))
  }

  onSaveNote = (ev) => {
    ev.preventDefault()
    const { note } = this.state
    noteService.saveNote(this.state.note).then(() => {
      this.props.history.push('/keep')
    })
  }

  render() {

    switch (this.state.note.type) {
      case 'NoteTxt':
        console.log('txt');
        return <NoteTxtEdit note={note} onSaveNote={this.onSaveNote} handleChange={this.handleChange}/>
      case 'NoteImg':
        return <NoteImgEdit note={note}/>
      case 'NoteTodos':
        return <NoteTodosEdit note={note}/>
      case 'NoteVideo':
        return <NoteVideoEdit note={note}/>
      default:
        return //...some default error view
    }

  }
}