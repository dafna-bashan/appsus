
import { eventBusService } from '../../../services/event-bus-service.js';
import { noteService } from '../services/note.service.js';

import { Icons } from "./Icons.jsx";

export class NoteAdd extends React.Component {

    state = {
        note: {
            id: '',
            type: "NoteTxt",
            isPinned: true,
            title: 'Coding',
            info: {
                txt: "I love coding!"
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
        ev.preventDefault();
        const field = ev.target.name;
        const inputValue = ev.target.type === "number" ? +ev.target.value : ev.target.value;
        let value = inputValue;
        if (field === 'info') {
            switch (this.state.note.type) {
                case 'NoteTxt': value = { txt: inputValue };
                    break;
                case 'NoteImg': value = { url: inputValue };
                    break;
                case 'NoteVideo': value = { url: inputValue };
                    break;
                case 'NoteTodos':
                    let todosArr = inputValue.split(',');
                    let todosObjects = todosArr.map(todo => ({ txt: todo, doneAt: null }));
                    value = { todos: todosObjects };
                    break;
            }
        }
        this.setState((prevState) => ({
            isAdding: true,
            note: {
                ...prevState.note,
                [field]: value,
            }
        }
        ));
    };

    handleTypeChange = (noteType) => {
        this.setState((prevState) => ({
            note: {
                ...prevState.note,
                type: noteType,
            }
        }
        ));
    }

    // AddNote = (ev) => {
    //     ev.preventDefault();
    //     console.log(ev);
    //     console.log(this.state);
    //     noteService.createNote(this.state)
    //         .then(() => { this.props.onAddNote() })
    //     // .then(() => {this.setState((prevState) => ({
    //     //     isAdding: false,
    //     //     note: {}
    //     // }


    //     // })
    //     // ));
    //     // });
    // }

    addNote = (ev) => {
        ev.preventDefault()
        console.log(ev);
        noteService.createNote(this.state)
            .then(() => { this.props.onAddNote() })
            .then(() => {
                this.setState({
                    note: {
                        id: '',
                        type: "NoteTxt",
                        isPinned: false,
                        title: '',
                        info: {
                            txt: ""
                        },
                        style: {
                            backgroundColor: "#00d"
                        }
                    }
                })
            })
            console.log(this.state);
    }

    get placeholder() {
        console.log(this.state.note.type);
        switch (this.state.note.type) {
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
                <form onSubmit={this.addNote}>
                    <input type="text" name="title" id="title" placeholder="title" onChange={this.handleChange} ref={this.inputRef} required />
                    <textarea name="info" id="info" cols="30" rows="3" placeholder={this.placeholder} onChange={this.handleChange} required></textarea>
                    {/* <input type="text" name="info" id="info"    /> */}
                    <Icons noteType="NoteTxt" handleChange={this.handleTypeChange} />
                    <Icons noteType="NoteTodos" handleChange={this.handleTypeChange} />
                    <Icons noteType="NoteImg" handleChange={this.handleTypeChange} />
                    <Icons noteType="NoteVideo" handleChange={this.handleTypeChange} />
                    {/* <button onClick={this.handleChange}><Icons noteType="NoteAudio"/></button> */}
                    <button>Add</button>
                </form>
            </section>
        );
    }
}
