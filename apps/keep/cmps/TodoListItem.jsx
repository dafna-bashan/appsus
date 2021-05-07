import { LongTxt } from '../../../cmps/LongTxt.jsx';


export class TodoListItem extends React.Component {

    state = {
        todo: {
            txt: '',
            doneAt: null,
        },
        isEditing: this.props.isEditing
    }

    componentDidMount() {
        this.setState({ 
            todo:{
                txt: this.props.todo.txt,
                doneAt: this.props.todo.doneAt
            },
            isEditing: this.props.isEditing
            });
    }

    toggleDone = (ev) => {
        if (this.state.doneAt) {
            this.setState(prevState => ({
                todo: {
                  ...prevState.txt,
                  doneAt: null
                },
                ...prevState.isEditing
              }))
            console.log(null);
        } else {
            this.setState(prevState => ({
                todo: {
                  ...prevState.txt,
                  doneAt: Date.now()
                },
                ...prevState.isEditing
              }))
        }
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(prevState => ({
          todo: {
            ...prevState.todo,
            [field]: value
          },
          ...prevState.isEditing
        }))
      }
    
    

    render() {
        const {id, idx } = this.props;
        const {todo, note} = this.props;
        console.log(todo, note);
        const name = `list-item-${id}-${idx}`;
        // console.log(name);
        const txtClassName = todo.doneAt ? 'done': 'not-done'
        return (
            <section>
                {/* {todo.doneAt && <span>{todo.title}<input type="checkbox" id={name} name={name} defaultChecked onChange={()=>this.props.onToggleDone(note.id, todo.id)}></input></span>}
                {!todo.doneAt && <span>{todo.title} <input type="checkbox" id={name} name={name} onChange={()=>this.props.onToggleDone(note.id, todo.id)}></input></span>}
                <label htmlFor={name}>{todo.txt}</label> */}
                {this.state.isEditing &&
                <input type="txt" name="txt" id="txt" value={todo.txt} onChange={this.handleChange}/>}
                          {!this.state.isEditing &&
                <span className={txtClassName} onClick={()=>{
                if (!todo || !note) return;
                this.props.onToggleDone(note.id, todo.id)}}>{todo.txt}</span>}
                
            </section>
        )
    }
}