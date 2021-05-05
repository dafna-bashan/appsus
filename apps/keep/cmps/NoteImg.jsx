export function NoteImg({ note, onRemoveNote}) {
    const{url} = note.info
return (
   <section className="note-img">
       <h4>{note.title}</h4>
       <img src={url} alt="image"/>
       <button onClick={()=>onRemoveNote(note.id)}>X</button>
   </section>
)
}