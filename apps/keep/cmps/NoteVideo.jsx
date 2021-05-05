export function NoteVideo({ note, onRemoveNote}) {
    const{url} = note.info
return (
   <section className="note-img">
       <h4>{note.title}</h4>
       <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" 
       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <button onClick={()=>onRemoveNote(note.id)}>X</button>
   </section>
)
}
