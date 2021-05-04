const { Link } = ReactRouterDOM
import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg';
import { NoteTodos } from './NoteTodos.jsx';
import { NoteVideo } from './NoteVideo.jsx';


export function NotePreview(props) {

        switch (props.note.type) {
            case 'NoteTxt':
                console.log('txt');
                return <NoteTxt {...props} />
            case 'NoteImg':
                return <NoteImg {...props} />
            case 'NoteTodos':
                return <NoteTodos {...props} />
            case 'NoteVideo':
                return <NoteVideo {...props} />
            default:
                return //...some default error view
        }
    }

