const { NavLink } = ReactRouterDOM
import {MailIcon} from '../cmps/MailIcon.jsx'
import {BookIcon} from '../cmps/BookIcon.jsx'
import {KeepIcon} from '../cmps/KeepIcon.jsx'

export function Home() {

    return(
        <div className="home flex justify-center align-center">
            <img src="assets/img/home-img.png"/>
            <div className="flex apps-icons">
            <div>
            <MailIcon/>
            <NavLink to="/mail">
            <h2>Mail</h2>
            </NavLink>
            </div>
            <div>
            <KeepIcon/>
            <NavLink to="/keep">
            <h2>Keep</h2>
            </NavLink>
            </div>
            <div>
            <BookIcon/>
            <NavLink to="/book">
            <h2>Books</h2>
            </NavLink>
            </div>
            </div>
        </div>
    )
}