import { bookService } from '../services/book-service.js';
import { utilService } from '../services/util-service.js'

export class ReviewAdd extends React.Component {

    state = {
        review: {
            id: utilService.makeId(),
            name: 'books reader',
            rate: 0,
            readAt: '',
            txt: ''
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        this.setState(prevState => ({
            review: {
                ...prevState.review,
                [field]: value
            }
        }))
      }
      onAddReview = (ev) => {
        ev.preventDefault()
        const bookId = this.props.match.params.bookId;
        bookService.addReview(bookId, this.state.review)
            .then(this.closeModal)
            .catch(err => console.log(err, 'error on submit'))
    }

    closeModal = () => {
        const bookId = this.props.match.params.bookId;
        this.props.history.push(`/book/${bookId}`)
    }
    
    render (){
        return (
            <form className="review-add" onSubmit={this.onAddReview}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" defaultValue="Books Reader" onChange={this.handleChange} required/>
      
              <label htmlFor="rate">Rate</label>
              <select name="rate" id="rate" onChange={this.handleChange} required>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
              <label htmlFor="readAt">Read at</label>
              <input type="date" id="readAt" name="readAt" onChange={this.handleChange} required/>
              <div>
              <textarea name="txt" id="txt" cols="30" rows="3" onChange={this.handleChange} required></textarea>
              </div>
              <button>Add</button>
            </form>
          )
    }
}