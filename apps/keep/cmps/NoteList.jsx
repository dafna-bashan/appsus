
import { NotePreview } from './NotePreview.jsx'
import { Pin } from './Pin.jsx'
import { Edit } from './Edit.jsx'
import { Trash } from './Trash.jsx'
import { Palette } from './Palette.jsx';
import { Colors } from './Colors.jsx';

export function NoteList({ notes, onRemoveNote, onPinNote, onEditNote, onToggleStyle, onChangeColor, getColorClass }) {
  var pinnedNotes = notes.filter(note=> note.isPinned);
  var notes = notes.filter(note=> !note.isPinned);

  return (
    <div className="note-list">
      <h4>Pinned Notes</h4>
      <div className="pinned-notes">
        {pinnedNotes.map(note => <div className={`note-preview ${getColorClass(note.style.backgroundColor)}`} key={note.id}>
          <NotePreview note={note} />
          {note.style.isChanging && <Colors note={note} onChangeColor={onChangeColor}/>}
          <div className="flex">
            <Pin note={note} onPinNote={onPinNote} />
            <Palette note={note} onToggleStyle={onToggleStyle}/>
            <Edit note={note} onEditNote={onEditNote}/>
            <Trash note={note} onRemoveNote={onRemoveNote} />
          </div>
        </div>
        )}
      </div>
      <div className="notes">
        <h4>Other Notes</h4>
        {notes.map(note => <div className={`note-preview ${getColorClass(note.style.backgroundColor)}`} key={note.id}>
          <NotePreview note={note} />
          {note.style.isChanging && <Colors note={note} onChangeColor={onChangeColor}/>}
          <div className="flex">
            <Pin note={note} onPinNote={onPinNote} />
            <Palette note={note} onToggleStyle={onToggleStyle}/>
            <Edit note={note} onEditNote={onEditNote}/>
            <Trash note={note} onRemoveNote={onRemoveNote} />
          </div>
        </div>
        )}
      </div>
    </div>
  )
}