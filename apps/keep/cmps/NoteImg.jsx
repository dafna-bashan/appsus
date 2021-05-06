const { Link } = ReactRouterDOM

export function NoteImg({ note, onRemoveNote}) {
    const{url} = note.info;
    // const linkUrl = `/note/edit/${note.id}`;
return (
   <section  className="note-preview">   
       <h4>{note.title}</h4>
       <img src={url} alt="image"/>
       {/* <button onClick={()=>onRemoveNote(note.id)}>X</button> */}
   </section>
)
}