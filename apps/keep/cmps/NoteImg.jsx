export function NoteImg({ note}) {
    const{url} = note.info
return (
   <section className="note-img">
       <h4>{note.title}</h4>
       <img src={url} alt="image"/>
   </section>
)
}