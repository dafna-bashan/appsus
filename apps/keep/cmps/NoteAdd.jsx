import { bookService } from "../services/book-service.js";
import {eventBusService} from '../../../services/event-bus-service.js';
import {SearchList} from './SearchList.jsx';

export class NoteAdd extends React.Component {

  state = {
    search: "",
    results: []
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value = ev.target.type === "number" ? +ev.target.value : ev.target.value;
    this.setState((prevState) => ({
      search: value,
      ...prevState.results
      }
    ));
  };


  render() {
    return (
        <section>
        <form>

        </form>
        </section>
    );
  }
}
