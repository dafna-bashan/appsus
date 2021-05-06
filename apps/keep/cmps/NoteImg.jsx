const { Link } = ReactRouterDOM

export function NoteImg({ note, onRemoveNote}) {
    const{url} = note.info;
    const linkUrl = `/note/edit/${note.id}`;
return (
   <section className="note-img">
       <Link key={note.id} className="note-preview" to={linkUrl}>
       <h4>{note.title}</h4>
       <img src={url} alt="image"/></Link>
       <button onClick={()=>onRemoveNote(note.id)}>X</button>
   </section>
)
}