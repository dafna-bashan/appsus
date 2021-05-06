import { LongTxt } from '../../../cmps/LongTxt.jsx';
const { Link } = ReactRouterDOM

export function NoteTxt({ note, onRemoveNote, isLongTxtShown }) {
console.log(note);
const url = `/note/edit/${note.id}`
return (
    <section>
        <Link key={note.id} className="note-preview" to={url}>
        <h4>{note.title}</h4>
        <LongTxt text={note.info.txt} isLongTxtShown={isLongTxtShown}/></Link>
        <button onClick={()=>onRemoveNote(note.id)}>X</button>
    </section>
)
}