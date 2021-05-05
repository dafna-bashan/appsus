
import { eventBusService } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note.service.js';

import { Icons } from "./Icons.jsx";

export class NoteAdd extends React.Component {

    state = {
        noteType: '',
        input: ''
    };

    componentDidMount() {
        // We dont use dqs in react, instead use Ref
        // document.querySelector('input')
        // console.log(this.inputRef);
        this.inputRef.current.focus()
    }

    handleChange = (ev) => {
        const type = ev.target.className;
        console.log(type);
        this.setState((prevState) => ({
            noteType: type,
            ...prevState.input
        }
        ));
    };

    onAddNote = (ev) => {
        ev.preventDefault();
        let info;
        switch (this.state.noteType) {
            case 'NoteTxt': info = { txt: ev.target.value };
                break;
            case 'NoteImg' || 'NoteVideo': info = { url: ev.target.value };
                break;
            case 'NoteTodos':
                let todosArr = ev.target.value.split(',');
                let todosObjects = todosArr.map(todo => ({ txt: todo, doneAt: null }));
                info = {todos: todosObjects};
                break;    
            }
            noteService.createNote(this.state.noteType, info);
    }

    get placeholder() {
        console.log(this.state.noteType);
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
                <form onSubmit={this.onAddNote}>
                    <input type="text" name="title" id="title" placeholder="title" />
                    <input type="text" name="text" id="text" placeholder={this.placeholder} ref={this.inputRef} />
                    <button className="NoteTxt" onClick={this.handleChange}><Icons noteType="NoteTxt" /></button>
                    <button className="NoteTodos" onClick={this.handleChange}><Icons noteType="NoteTodos" /></button>
                    <button className="NoteImg" onClick={this.handleChange}><Icons noteType="NoteImg" /></button>
                    <button className="NoteVideo" onClick={this.handleChange}><Icons noteType="NoteVideo" /></button>
                    {/* <button onClick={this.handleChange}><Icons noteType="NoteAudio"/></button> */}
                    <input type="submit" value="Submit"/>
                </form>
            </section>
        );
    }
}
