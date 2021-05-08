import { noteService } from '../services/note.service.js'
import { TodoListItem } from './TodoListItem.jsx'
import { TrashTodo } from './TrashTodo.jsx'
import {EditTodo} from './EditTodo.jsx'

export class NoteEdit extends React.Component {

  state = {
    note: {},

  }

  componentDidMount() {
    const id = this.props.match.params.noteId
    console.log(id);
    if (!id) return
    noteService.getNoteById(id).then(note => {
      this.setState({ note })
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
      }

      this.setState((prevState) => ({
        note: {
          ...prevState.note,
          [field]: value,
        }
      }
      ));
    }
    else if (field === 'txt') {
      // let todosArr = inputValue.split(',');
      //done at??
      // let todosObjects = todosArr.map(todo => ({ txt: todo, doneAt: null }));
      // value = { todos: todosObjects };
      //     let todosArr = this.state.note.info.todos;
      //   let todo = {[field]: inputValue, doneAt: null}
      //   let newTodos;
      //   if (inputValue.length ===1){

      //     newTodos = todosArr.push(todo);
      //   }else {
      // newTodos = todosArr.splice(todosArr.length-1, 1, todo)
      //   }
      this.setState((prevState) => ({
        note: {
          ...prevState.note,
          info: {
            todos: [...prevState.note.info.todos], [field]: inputValue
            // ...prevState.note.info, field: inputValue}}}))
          }
        }
      }), console.log(this.state))
    } else {
      this.setState((prevState) => ({
        note: {
          ...prevState.note,
          [field]: value,
        }
      }
      ));
    }
  };

  onSaveNote = (ev) => {
    ev.preventDefault()
    const { note } = this.state
    console.log(note);
    noteService.saveNote(note).then(() => {
      this.setState((prevState) => ({
        note: {

        }
      }))
    })
      .then(() => {
        this.props.history.push('/keep')
      });
  }

  onAddTodo = (ev) => {
    ev.preventDefault()
    const { note } = this.state
    let todosArr = this.state.note.info.todos;
    let todo = { txt: this.state.note.info.txt, doneAt: null }
    console.log(todosArr, todo);
    todosArr.push(todo);
    let newTodos = todosArr;
    console.log(newTodos);
    noteService.saveNote(note).then(() => {
      this.setState((prevState) => ({
        note: {
          ...prevState.note,
          info: {
            todos: newTodos,
            txt:''
          }
        }}))});
  }

  onRemoveTodo = (todoId, noteId)=>{
    noteService.removeTodo(todoId, noteId).then((note)=>{
      this.setState({note})
    })
  }

  onToggleDone = (todoId, noteId)=>{
    noteService.toggleDone(todoId, noteId).then((note)=>{
      this.setState({note})
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
    const { note } = this.state
    return (
      <section className="note-edit">
        {note.type === 'NoteTodos' &&
          <section className="edit-todos flex">
            <h4>{note.title}</h4>
            {console.log(note)}
            {note.info.todos.map((todo, idx) => <div className="flex" key={idx}>
              <TodoListItem todo={todo} note={note} idx={idx} onToggleDone={this.onToggleDone}/>
              <TrashTodo todo={todo} note={note} onRemoveTodo={this.onRemoveTodo}/>
            </div>)}
            <form onSubmit={this.onAddTodo} className="flex">
              <input type="text" name="txt" id="txt" placeholder="add todo" value={note.info.txt}onChange={this.handleChange}/>
              <button>Add</button>
            </form>
            <button onClick={this.onSaveNote}>save</button>
          </section>
        }

        {this.state.note.type !== 'NoteTodos' &&
          <form onSubmit={this.onSaveNote} className="flex edit-txt">
            <input type="text" name="title" id="title" placeholder="title" onChange={this.handleChange} ref={this.inputRef} value={this.titleValue} />
            <textarea name="info" id="info" cols="30" rows="3" placeholder={this.placeholder} onChange={this.handleChange} value={this.textAreaValue}></textarea>
            <button>Save</button>
          </form>
        }
      </section>
    );

  }
}
