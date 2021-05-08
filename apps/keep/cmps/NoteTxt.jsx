import { LongTxt } from '../../../cmps/LongTxt.jsx';
const { Link } = ReactRouterDOM

export function NoteTxt({ note, onRemoveNote, isLongTxtShown }) {
// console.log(note);
const url = `/note/edit/${note.id}`
return (
    <section className="note-preview note-txt">
        <h4>{note.title}</h4>
        <LongTxt text={note.info.txt} isLongTxtShown={isLongTxtShown}/>
    </section>
)
}