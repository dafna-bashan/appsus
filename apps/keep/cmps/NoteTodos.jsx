const { Link } = ReactRouterDOM

import { LongTxt } from '../../../cmps/LongTxt.jsx';
import {TodoListItem} from './TodoListItem.jsx';

export function NoteTodos({ note, onRemoveNote}) {
     const{todos} = note.info
     const url = `/note/edit/${note.id}`
return (
    <section>
        <Link key={note.id} className="note-preview" to={url}>
        <h4>{note.title}</h4>
        {todos.map((todo, idx) => <TodoListItem todo={todo} key={idx} idx={idx}/>)}</Link>
        <button onClick={()=>onRemoveNote(note.id)}>X</button>
    </section>
)
}