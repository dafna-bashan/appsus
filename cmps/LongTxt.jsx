export function LongTxt ({text, isLongTxtShown}) {
    
    if (!text) return '';
    console.log(isLongTxtShown)


    return (
            <section>
                {isLongTxtShown ? text : text.substr(0, 60)}...
            </section>
        )
}
