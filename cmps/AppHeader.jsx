import { eventBusService } from '../services/event-bus-service.js'
import { UserMsg } from './UserMsg.jsx';

const { NavLink, withRouter } = ReactRouterDOM
import { Menu } from './Menu.jsx';
import { MailIcon } from './MailIcon.jsx';
import { KeepIcon } from './KeepIcon.jsx';
import { BookIcon } from './BookIcon.jsx';

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
      <header className="main-header">
        <nav className="nav-container container flex align-center space-between">
          {/* <UserMsg/> */}
          <div className="logo"><NavLink exact to="/">AppSus</NavLink></div>
          <div className="nav-links flex">
            <MailIcon/>
            <KeepIcon/>
            <BookIcon/>
          </div>
          {/* <ul className="main-nav flex clean-list justify-content align-center">
          <li className="flex justify-center align-center"><NavLink exact to="/">Home</NavLink></li>
          <li className="flex justify-center align-center"><NavLink to="/book">Books</NavLink></li>
          <li className="flex justify-center align-center"><NavLink to="/mail">Mail</NavLink></li>
          <li className="flex justify-center align-center"><NavLink to="/keep">Keep</NavLink></li>
          <li className="flex justify-center align-center"><button onClick={() => {
            this.props.history.push('/')
          }}>Back</button></li>
        </ul> */}
        </nav>
      </header>
    )
  }
}

export const AppHeader = withRouter(_AppHeader)