const {Link } = ReactRouterDOM

export function BookPreview({ book, setSelectedBook}) {

let currencyIcon = '';

  switch (book.listPrice.currencyCode){
    case 'EUR': currencyIcon = '€';
    break;
    case 'USD': currencyIcon = '$';
    break;
    case 'ILS': currencyIcon = '₪';
    break;
  }

  return (
    <Link to={`/book/${book.id}`}>
    <article className="book-preview" onClick={() => setSelectedBook(book)}>
      <img src={book.thumbnail}/>
      <p>{book.title}</p>
      <p>{book.listPrice.amount} {currencyIcon}</p>
    </article>
    </Link>
  )
}