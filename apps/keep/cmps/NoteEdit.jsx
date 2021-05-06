import { noteService } from '../services/note.service.js'
import {TodoListItem} from './TodoListItem.jsx'
import {Trash} from './Trash.jsx'

export class NoteEdit extends React.Component {

  state = {
    isEditing: false,
    note: {}

  }

  componentDidMount() {
    const id = this.props.match.params.noteId
    console.log(id);
    if (!id) return
    noteService.getNoteById(id).then(note => {
      this.setState({ isEditing: false, note })
    })
    console.log(this.state.note);
  }

  handleChange = (ev) => {
    ev.preventDefault();
    const field = ev.target.name;
    const inputValue = ev.target.type === "number" ? +ev.target.value : ev.target.value;
    let value = inputValue;
    if (field === 'info') {
      switch (this.state.note.type) {
        case 'NoteTxt': value = { txt: inputValue };
          break;
        case 'NoteImg': value = { url: inputValue };
          break;
        case 'NoteVideo': value = { url: inputValue };
          break;
        case 'NoteTodos':
            let todosArr = inputValue.split(',');
          //done at??
            let todosObjects = todosArr.map(todo => ({ txt: todo, doneAt: null }));
            value = { todos: todosObjects };
          // let todo = {txt: inputValue, doneAt: null}
          // this.setState((prevState) => ({
          //   isEditing: true,
          //   note:{
          //     ...prevState.note,
          //     [field]: {
          //       todos: [...prevState.todos, todo]}}})).then(()=> null)
         
      }
    }
    this.setState((prevState) => ({
        isEditing: true,
        note:{
          ...prevState.note,
          [field]: value,
        }
      }
    ));
  };

  onSaveNote = (ev) => {
    ev.preventDefault()
    const { note } = this.state
    console.log(note);
    noteService.saveNote(note).then(() => {
      this.setState((prevState) => ({
        isEditing: false,
        note: {
       
        }}))})
    .then(() => {
      this.props.history.push('/keep')
    });
  }

  onAddTodo = (ev) => {
    ev.preventDefault()
    const { note } = this.state
    console.log(note);
    noteService.saveNote(note).then(() => {
      this.setState((prevState) => ({
        note: {
          isEditing: false,
          ...prevState.note,
        }
      }
      ));
    })
  }


  get titleValue() {
    const { note } = this.state
    console.log(note);
    return note.title;
  }

  get textAreaValue() {
    const { note } = this.state
    switch (note.type) {
      case 'NoteTxt': return note.info.txt;
      case 'NoteTodos':
        const todosTxt = note.info.todos.map(todo => todo.txt);
        return todosTxt.join(',');
      case 'NoteImg': return note.info.url;
      case 'NoteVideo': return note.info.url;

    }
  }

  render() {
    const {note} = this.state
    return (
      <section>
        {/* {note.type === 'NoteTodos' && */}
          {/* <section>
            <h4>{note.title}</h4>
            {note.info.todos.map((todo, idx) => <div key={idx}>
              <TodoListItem todo={todo}  idx={idx} /><Trash  />
            </div>)}
            <form onSubmit={this.onAddTodo}>
              <input type="text" name="title" id="title" placeholder="add todo" onChange={this.handleChange} />
              <button>Add</button>
            </form>
          </section> */}
          {/* } */}

        {/* {this.state.note.type === 'NoteTxt' || 'NoteVideo' || 'NoteImg' && */}
          <form onSubmit={this.onSaveNote}>
            <input type="text" name="title" id="title" placeholder="title" onChange={this.handleChange} ref={this.inputRef} value={this.titleValue} />
            <textarea name="info" id="info" cols="30" rows="3" placeholder={this.placeholder} onChange={this.handleChange} value={this.textAreaValue}></textarea>
            <button>Save</button>
          </form>
        {/* } */}
      </section>
    );

  }
}
