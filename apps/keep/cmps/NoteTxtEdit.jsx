

export function NoteTxtEdit({ note, onRemoveNote, handleChange, saveNote }) {
return (
    <section>
        <form onSubmit={()=>saveNote()}>
            <input type="text" name="title" id="title" placeholder="title" value={note.title} onChange={()=>handleChange()}/>
            <textarea name="info" id="info" cols="30" rows="3" value={note.info.txt} onChange={()=>handleChange()}></textarea>
            <button>Save</button>
        </form>
    </section>
);
}