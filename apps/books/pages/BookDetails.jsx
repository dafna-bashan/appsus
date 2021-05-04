import { LongTxt } from '../../../cmps/LongTxt.jsx'
import { ReviewAdd } from '../cmps/ReviewAdd.jsx';
import {bookService} from '../services/book-service.js'
import {ReviewsList} from '../cmps/ReviewsList.jsx'
const { Link, Route  } = ReactRouterDOM;

export class BookDetails extends React.Component {

  state = {
    book: null,
    isLongTxtShown: false,
  }

  componentDidMount() {
    this.loadBook()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook()
    }
  }


  loadBook() {
    const id = this.props.match.params.bookId;
    bookService.getBookById(id).then(book => {
      if (!book) return this.props.history.push('/');
      this.setState({ book });
    })
  }

  getYear = () => {
    const date = new Date;
    return date.getFullYear();
  }

  setDescLength = () => {
    // same as this.setState(prevState=> {isLongTxtShown: !prevState.isLongTxtShown})
    // this.setState(
    //   ({ isLongTxtShown }) => ({ isLongTxtShown: !isLongTxtShown }))
      this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
  };

  // get functions - cannot receieve params, must contain a return statement.is called without ()
  get readingLevel() {
    const { pageCount } = this.state.book;
    if (pageCount > 500) return 'long reading';
    else if (pageCount > 200) return 'decent reading';
    else if (pageCount < 100) return 'light reading';
  }

  get seniority() {
    const { publishedDate } = this.state.book;
    if (this.getYear() - +publishedDate > 10) return 'veteran book';
    if (this.getYear() - +publishedDate < 1) return 'new!';
  }

  get priceClass() {
    const { amount } = this.state.book.listPrice;
    if (+amount > 150) return 'expensive';
    if (+amount < 20) return 'cheap';
  }

  get currencyIcon(){
    const { currencyCode } = this.state.book.listPrice;
    switch (currencyCode){
      case 'EUR': return '€';
      case 'USD': return '$';
      case 'ILS': return '₪';

    }
  }


  onRemoveReview = (reviewId) => {
    bookService.removeReview(this.state.book, reviewId).then(() => this.loadBook())
}

  render() {
    if (!this.state.book) return <div>Loading...</div>
    const { id, title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice, reviews } = this.state.book;
    let sale = listPrice.isOnSale ? 'SALE!!!' : ''
    let buttonTxt = this.state.isLongTxtShown ? 'show less' : 'show more';

    return (
      <div className="book-details">
        {thumbnail && <img src={thumbnail} />}
        <h2>{`${title} | ${authors}`}</h2>
        <p>{subtitle}</p>
        <p className={this.priceClass}>{`${listPrice.amount} ${this.currencyIcon}`}<span className="sale">{sale}</span></p>
        <p>Page count: {`${pageCount} ${this.readingLevel}`}</p>
        <p>Categories: {categories && categories.map(category => ' ' + category)}</p>
        <p>Year: {`${publishedDate} ${this.seniority}`}</p>
        <p>language: {language}</p>
        <LongTxt text={description} isLongTxtShown={this.state.isLongTxtShown}/>
        <button onClick={this.setDescLength}>{buttonTxt}</button>
        <Route component={ReviewAdd} path="/book/:bookId/add-review" />
        <Link className="btn-add-review" to={`/book/${id}/add-review`}>Add Review</Link>
        <ReviewsList reviews={reviews} removeReview={this.onRemoveReview} />
        <Link to={`/book/${bookService.getNextBookId(id)}`}>Next Book</Link>
        <Link to={`/book`}>Go back</Link>
        {/* <button onClick={() => onRemoveBook(book.id)}>Delete Book</button> */}
      </div>
    )
  }
}