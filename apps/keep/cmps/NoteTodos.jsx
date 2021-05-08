const { Link } = ReactRouterDOM

import { LongTxt } from '../../../cmps/LongTxt.jsx';
import {TodoListItem} from './TodoListItem.jsx';

export function NoteTodos({ note, onRemoveNote}) {
     const{todos} = note.info
     console.log(todos);
    //  const url = `/note/edit/${note.id}`
return (
    <section className="note-preview note-todos">
        <h4>{note.title}</h4>
        {todos.map((todo, idx) => <TodoListItem todo={todo} id={note.id} key={idx} idx={idx}/>)}
    </section>
)
}