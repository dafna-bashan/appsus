
import { NotePreview } from './NotePreview.jsx'


export function NoteList({ notes, onRemoveNote }) {
    console.log(notes);
  return (
    <div className="note-list">
      { notes.map(note => <NotePreview note={note} key={note.id} onRemoveNote={onRemoveNote}/>
  )}
    </div>
  )
}