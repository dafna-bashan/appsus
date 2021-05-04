import { LongTxt } from '../../../cmps/LongTxt.jsx';
import {TodoListItem} from './TodoListItem.jsx';

export function NoteTodos({ note}) {
     const{todos} = note.info
return (
    <section>
        <h4>{note.title}</h4>
        {todos.map((todo, idx) => <TodoListItem todo={todo} key={idx} idx={idx}/>)}
    </section>
)
}