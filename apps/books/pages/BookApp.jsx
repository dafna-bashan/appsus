const { Link } = ReactRouterDOM
import { bookService } from '../services/book-service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from './BookDetails.jsx'

export class BookApp extends React.Component {
    state = {
        books: null,
        filterBy: null,
        selectedBook: null//cancel
    }
    componentDidMount() {
        this.loadBooks()
    }

    loadBooks() {
        bookService.query(this.state.filterBy).then((books) => {
            // console.log(books);
            this.setState({ books })
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadBooks)
    }

    setSelectedBook = (book) => {
        this.setState({ selectedBook: book })
    }

    
    render() {
        // console.log('RENDER!', this.state.books);
        const { books, selectedBook } = this.state
        if (!books) return <div>Loading...</div>
        return (
            <div>
            <section className="book-app">
            {/* <UserMsg/> */}
                {!selectedBook && <React.Fragment>
                    <Link className="add-link" to="/book/add">Add book</Link>
                    <BookFilter onSetFilter={this.onSetFilter} />
                    <BookList books={books} setSelectedBook={this.setSelectedBook} />
                </React.Fragment>}
                {selectedBook &&
                    <BookDetails className="book-details" book={selectedBook} goBack={() => this.setSelectedBook(null)} />}
            </section>
            </div>
        )
    }
}