
import { eventBusService } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note.service.js';

import { Icons } from "./Icons.jsx";

export class NoteAdd extends React.Component {

    state = {
        note: {
            type: "NoteTxt",
            isPinned: false,
            title: '',
            info: {
                url: "https://i.pinimg.com/564x/9a/b0/7b/9ab07b7ae73e44a806c468e6fd174149.jpg",

            },
            style: {
                backgroundColor: "#00d"
            }
        }
    };

    componentDidMount() {
        // We dont use dqs in react, instead use Ref
        // document.querySelector('input')
        // console.log(this.inputRef);
        this.inputRef.current.focus()
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const inputValue = ev.target.type === "number" ? +ev.target.value : ev.target.value;
        let value = inputValue;
        if (field === 'info') {
            switch (this.state.note.type) {
                case 'NoteTxt': value = { txt: inputValue };
                    break;
                case 'NoteImg' || 'NoteVideo': value = { url: inputValue };
                    break;
                case 'NoteTodos':
                    let todosArr = inputValue.split(',');
                    let todosObjects = todosArr.map(todo => ({ txt: todo, doneAt: null }));
                    value = { todos: todosObjects };
                    break;
            }
        }
        this.setState((prevState) => ({
            note: {
                ...prevState.note,
                [field]: value,
            }
        }
        ));
    };

    AddNote = (ev) => {
        ev.preventDefault();
        console.log(this.state);
        noteService.createNote(this.state).then(() => {
            this.props.onAddNote()
        });
    }

    get placeholder() {
        console.log(this.state.note.type);
        switch (this.state.noteType) {
            case 'NoteTxt': return 'Enter text';
            case 'NoteImg': return 'Enter image URL';
            case 'NoteTodos': return 'Enter comma separated list';
            case 'NoteVideo': return 'Enter video URL';
        }
    }
    inputRef = React.createRef()

    render() {
        return (
            <section>
                <form onSubmit={this.AddNote}>
                    <input type="text" name="title" id="title" placeholder="title" onChange={this.handleChange} ref={this.inputRef}/>
                    <textarea name="info" id="info" cols="30" rows="3" placeholder={this.placeholder} onChange={this.handleChange}></textarea>
                    {/* <input type="text" name="info" id="info"    /> */}
                    <Icons noteType="NoteTxt" handleChange={this.handleChange} />
                    <Icons noteType="NoteTodos" handleChange={this.handleChange} />
                    <Icons noteType="NoteImg" handleChange={this.handleChange} />
                    <Icons noteType="NoteVideo" handleChange={this.handleChange} />
                    {/* <button onClick={this.handleChange}><Icons noteType="NoteAudio"/></button> */}
                    <button>Add</button>
                </form>
            </section>
        );
    }
}
