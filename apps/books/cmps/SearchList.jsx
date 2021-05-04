import { bookService } from '../services/book-service.js';
import {SearchItem} from './SearchItem.jsx';


export function SearchList({ books, addGoogleBook}) {
    return (
      <div>
        { books.map(book => <SearchItem book={book} key={book.id} addGoogleBook={addGoogleBook}/>)}
      </div>
    )
  }