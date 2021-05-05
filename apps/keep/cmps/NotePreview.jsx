const { Link } = ReactRouterDOM
import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteTodos } from './NoteTodos.jsx';
import { NoteVideo } from './NoteVideo.jsx';


export function NotePreview(props) {
    const {note} = props;
const url = `/note/edit/${note.id}`
        switch (note.type) {
            case 'NoteTxt':
                console.log('txt');
                return <Link key={note.id} className="note-preview" to={url}><NoteTxt {...props}/></Link>
            case 'NoteImg':
                return <Link key={note.id} className="note-preview" to={url}><NoteImg {...props}/></Link>
            case 'NoteTodos':
                return <Link key={note.id} className="note-preview" to={url}><NoteTodos {...props}/></Link>
            case 'NoteVideo':
                return <Link key={note.id} className="note-preview" to={url}><NoteVideo {...props}/></Link>
            default:
                return //...some default error view
        }
    }

