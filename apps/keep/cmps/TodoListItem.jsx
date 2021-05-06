import { LongTxt } from '../../../cmps/LongTxt.jsx';


export class TodoListItem extends React.Component {

    state = {
        doneAt: null
    }

    componentDidMount() {
        this.setState({doneAt: this.props.todo.doneAt});
    }

    handleChange = (ev) => {
        if (this.state.doneAt){
            this.setState ({doneAt: null})
            console.log(null);
        } else {
            this.setState ({doneAt: Date.now()})
            console.log(Date.now());
        }
    }


    render() {
        const {todo, id, idx} = this.props;
        const name = `list-item-${id}-${idx}`;
        // console.log(name);
        return (
            <section>
                
                {todo.doneAt && <span><del>{todo.title}</del> <input type="checkbox" id={name} name={name} defaultChecked onChange={this.handleChange}></input></span>}
                {!todo.doneAt && <span>{todo.title} <input type="checkbox" id={name} name={name} onChange={this.handleChange}></input></span>}
                <label htmlFor={name}>{todo.txt}</label>
            </section>
        )
    }
}