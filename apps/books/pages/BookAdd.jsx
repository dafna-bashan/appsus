import { bookService } from "../services/book-service.js";
import {eventBusService} from '../../../services/event-bus-service.js';
import {SearchList} from '../cmps/SearchList.jsx';
const { Link, Route  } = ReactRouterDOM;

export class BookAdd extends React.Component {
  state = {
    search: "",
    results: []
  };

  loadResults = (ev)=> {
    ev.preventDefault();
    bookService.searchGoogleBooks(this.state.search)
        .then((books) => {
      this.setState((prevState) => ({ ...prevState.search, results: books }));
    });
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.type === "number" ? +ev.target.value : ev.target.value;
    this.setState((prevState) => ({
      search: value,
      ...prevState.results
      }
    ));
  };

addGoogleBook = (book)=>{
  const addBook = bookService.addGoogleBook(book)
    if (!addBook){
        eventBusService.showUserMsg(`The book ${book.volumeInfo.title} alredy exist!`, 'error', book.id)
    }else {
        // bookService.addGoogleBook(book);
        eventBusService.showUserMsg(`The book ${book.volumeInfo.title} was added!`, 'sucsses', book.id)
    }
}

//   handleChange = (ev) => {
//     const field = ev.target.name;
//     const value = ev.target.type === "number" ? +ev.target.value : ev.target.value;
//     this.setState((prevState) => ({
//       search: {
//         ...prevState.search,
//         [field]: value,
//       },
//     }));
//   };

  render() {
    return (
        <section className="search">
        <form className="flex">
            <input type="search" name="search" id="search" placeholder="search book" onChange={this.handleChange}/>
            <button onClick={this.loadResults}>Search</button>     
        </form>
        <SearchList books={this.state.results} addGoogleBook={this.addGoogleBook}/>
        </section>
    );
  }
}
