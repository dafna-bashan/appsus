import { Trash } from "./Trash";


export class NoteEdit extends React.Component {


render(){
    return (
        <section>
            <h4>{note.title}</h4>
            {todos.map((todo, idx) => <div>
                <TodoListItem todo={todo} key={idx} idx={idx} /><Trash onRemoveTodo={onRemoveTodo}/>
            </div>)}

        </section>
    )
}
}
