export function LongTxt ({text, isLongTxtShown}) {
    
    if (!text) return '';
    console.log(isLongTxtShown)


    return (
            <section>
                {(isLongTxtShown || text.length< 100) ? text : text.substr(0, 100)+'...'}
            </section>
        )
}
