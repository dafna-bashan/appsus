export function LongTxt ({text, isLongTxtShown}) {
    
    if (!text) return '';
    
    return (
            <section>
                {isLongTxtShown ? text : text.substr(0, 100)}
            </section>
        )
}
