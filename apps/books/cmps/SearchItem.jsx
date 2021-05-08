export function SearchItem({ book, bookId ,addGoogleBook}) {

    return (
        <div className="search-item">
            <span>{book.volumeInfo.title}</span>
            <button onClick={() => addGoogleBook(book)}>+</button>
        </div>
    )



}