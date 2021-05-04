export function SearchItem({ book, bookId ,addGoogleBook}) {

    return (
        <div>
            <span>{book.volumeInfo.title}</span>
            <button onClick={() => addGoogleBook(book)}>+</button>
        </div>
    )



}