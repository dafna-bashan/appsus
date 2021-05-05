import { LongTxt } from '../../../cmps/LongTxt.jsx';
import {TodoListItem} from './TodoListItem.jsx';

export function NoteTodos({ note, onRemoveNote}) {
     const{todos} = note.info
return (
    <section>
        <h4>{note.title}</h4>
        {todos.map((todo, idx) => <TodoListItem todo={todo} key={idx} idx={idx}/>)}
        <button onClick={()=>onRemoveNote(note.id)}>X</button>
    </section>
)
}