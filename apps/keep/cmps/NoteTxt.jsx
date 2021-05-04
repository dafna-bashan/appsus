import { LongTxt } from '../../../cmps/LongTxt.jsx';

export function NoteTxt({ note, isLongTxtShown }) {
    console.log(note);
return (
    <section>
        <h4>{note.title}</h4>
        <LongTxt text={note.info.txt} isLongTxtShown={isLongTxtShown}/>
    </section>
)
}