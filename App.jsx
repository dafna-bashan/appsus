const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import { AppHeader } from './cmps/AppHeader.jsx';
import { Home } from './pages/Home.jsx';
import {KeepApp} from './apps/keep/pages/KeepApp.jsx';
import {BookApp} from './apps/books/pages/BookApp.jsx';
import {EmailApp} from './apps/mail/pages/EmailApp.jsx';

export function App() {
    return (
        <Router>
            <AppHeader />
            <main>
                <Switch>
                    <Route component={BookApp} path="/book" />
                    <Route component={KeepApp} path="/keep" />
                    <Route component={EmailApp} path="/mail" />
                    <Route component={Home} path="/" />
                    {/* If we want to send props to a route: */}
                    {/* <Route render={(props)=> <AboutUs {...props} name="popo"/>} path="/about" /> */}
                </Switch>
            </main>
            <footer className="app-footer">
                ☕ coffeerights &copy; ☕
            </footer>
        </Router>
    )
}


