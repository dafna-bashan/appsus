const { Link } = ReactRouterDOM

export function NoteVideo({ note}) {
    const{url} = note.info
    const linkUrl = `/note/edit/${note.id}`
    console.log(url);
return (
   <section className="note-preview note-video">  
       <h4>{note.title}</h4>
       <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" 
       allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
   </section>
)
}
