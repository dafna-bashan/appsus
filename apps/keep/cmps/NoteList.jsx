
import { NotePreview } from './NotePreview.jsx'
import { Pin } from './Pin.jsx'
import { Edit } from './Edit.jsx'
import { Trash } from './Trash.jsx'

export function NoteList({ notes, onRemoveNote, onPinNote }) {
  var pinnedNotes = notes.filter(note=> note.isPinned);
  var notes = notes.filter(note=> !note.isPinned);

  return (
    <div className="note-list">
      <h4>Pinned Notes</h4>
      <div className="pinned-notes">
        {pinnedNotes.map(note => <div className="note-preview" key={note.id}>
          <NotePreview note={note} />
          <div className="flex">
            <Pin note={note} onPinNote={onPinNote} />
            <Edit note={note}/>
            <Trash note={note} onRemoveNote={onRemoveNote} />
          </div>
        </div>
        )}
      </div>
      <div className="notes">
        <h4>Other Notes</h4>
        {notes.map(note => <div className="note-preview" key={note.id}>
          <NotePreview note={note} />
          <div className="flex">
            <Pin note={note} onPinNote={onPinNote} />
            <Edit note={note}/>
            <Trash note={note} onRemoveNote={onRemoveNote} />
          </div>
        </div>
        )}
      </div>
    </div>
  )
}