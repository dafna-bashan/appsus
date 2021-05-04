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
        const {todo, idx} = this.props;
        const name = `list-item-${idx}`;
        return (
            <section>
                {todo.title}
                {todo.doneAt && <input type="checkbox" id={name} name={name} defaultChecked onChange={this.handleChange}></input>}
                {!todo.doneAt && <input type="checkbox" id={name} name={name} onChange={this.handleChange}></input>}
                <label htmlFor={name}>{todo.txt}</label>
            </section>
        )
    }
}