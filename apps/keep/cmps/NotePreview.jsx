
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
                return <NoteTxt {...props}/>
            case 'NoteImg':
                return <NoteImg {...props}/>
            case 'NoteTodos':
                return <NoteTodos {...props}/>
            case 'NoteVideo':
                return <NoteVideo {...props}/>
            default:
                return //...some default error view
        }
    }

