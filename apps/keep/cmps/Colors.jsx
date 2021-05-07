export function Colors({note, onChangeColor}) {
    return (
     <section className="colors-container flex">
         <div className="color blue" onClick={()=> onChangeColor(note.id, '#7C838A')}></div>
         <div className="color light-blue" onClick={()=> onChangeColor(note.id, '#E6F3FF')}></div>
         <div className="color grey" onClick={()=> onChangeColor(note.id, '#B0BAC3')}></div>
         <div className="color yellow" onClick={()=> onChangeColor(note.id, '#F2CB05')}></div>
     </section>
    )
}