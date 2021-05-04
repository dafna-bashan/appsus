import { eventBusService } from '../services/event-bus-service.js'
import { UserMsg } from './UserMsg.jsx';

const { NavLink, withRouter } = ReactRouterDOM

class _AppHeader extends React.Component {

  removeEvent;

  state = {

  }

  componentDidMount() {
    // Here we listen to the event that we emited, its important to remove the listener 
    // this.removeEvent = eventBusService.on('user-msg', (carCount) => {
    //   this.setState({ carCount })
    // })
  }

  componentWillUnmount() {
    // this.removeEvent()
  }

  render() {

    return (
      <nav className="app-header">
        <UserMsg/>
        <h1>Book Shop</h1>
        <ul className="clean-list">
          <li><NavLink exact to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/book">Books</NavLink></li>
          <li><NavLink to="/add-book">Add Book</NavLink></li>
          <li><button onClick={() => {
            this.props.history.push('/')
          }}>Back</button></li>
        </ul>
      </nav>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)